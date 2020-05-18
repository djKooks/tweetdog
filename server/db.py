from datetime import datetime, timedelta
import operator
import json
from sqlalchemy import (
    create_engine, MetaData, Table, Column, ForeignKey,
    Integer, String, DateTime,
)

from sqlalchemy.orm import sessionmaker

from .model import Base, Tweets
from .settings import config


DB_URL = "mysql+pymysql://{user}:{password}@{host}:{port}/{database}"

meta = MetaData()

db_url = DB_URL.format(**config['mysql'])
engine = create_engine(db_url)
Base.metadata.create_all(engine)

Session = sessionmaker()
Session.configure(bind=engine)
session = Session()

conn = engine.connect()


def _as_dict(row, created_without_time=False):
    result = dict()
    for key in row.keys():
        if key == 'created_date':
            created = getattr(row, key)
            if created_without_time:
                result[key] = created.strftime("%Y/%m/%d")
            else:
                result[key] = created.strftime("%Y/%m/%d, %H:%M:%S")
        else:
            result[key] = getattr(row, key)

    return result


def fetch_tweet(keyword=None):
    result = []
    if keyword is None:
        result = session.query(
            Tweets.id,
            Tweets.tweet_text,
            Tweets.tweet_link,
            Tweets.created_date,
        ).order_by(Tweets.created_date.desc()).limit(10)
    else:
        result = session.query(
            Tweets.id,
            Tweets.tweet_text,
            Tweets.tweet_link,
            Tweets.created_date,
        ).filter(Tweets.tweet_text.contains(keyword)).order_by(Tweets.created_date.desc()).limit(5)

    return [_as_dict(row) for row in result]


def fetch_count_by_time(hour=24):
    since = datetime.now() - timedelta(hours=hour)
    try:
        result = session.query(
            Tweets.id).filter(
            Tweets.created_date > since).order_by(
                Tweets.created_date.desc()).count()
        session.commit()
        return result
    except:
        session.rollback()
        raise


def tweet_count_by_time(key='week'):
    time = 24
    date_key = '%d/%H'
    if key is 'week':
        time = time * 7
        date_key = '%Y/%m/%d'

    since = datetime.now() - timedelta(hours=time)

    try:
        result = session.query(
            Tweets.created_date).filter(
            Tweets.created_date > since).order_by(
                Tweets.created_date.desc())
        session.commit()

        res_list = [row.created_date.strftime(date_key) for row in result]
        mapped = {x: res_list.count(x) for x in res_list}
        return mapped
    except:
        session.rollback()
        raise


def words_count(hour=3):
    since = datetime.now() - timedelta(hours=hour)
    filter_word = ['paypay', 'PayPay', 'RT', 'し', 'Pay', '円', 'ペイ',
                   'フォロー', '名', 'PayPayOfficial', 'いう', 'ツイ', '登録', '企画']
    result = []
    try:
        result = session.query(
            Tweets.tweet_word_set).filter(
            Tweets.created_date > since).order_by(
                Tweets.created_date.desc())
        session.commit()
    except:
        session.rollback()
        raise

    res_list = list()
    for row in result:
        for word in row.tweet_word_set.split(','):
            if word not in filter_word:
                res_list.append(word)

    mapped = {x: res_list.count(x) for x in res_list}
    filtered_map = dict(
        sorted(
            mapped.items(),
            key=operator.itemgetter(1),
            reverse=True)[
            :20])
    return filtered_map


def popular_user(hour=24):
    since = datetime.now() - timedelta(hours=hour)

    result = []
    try:
        result = session.query(
            Tweets.user_screen_name).filter(
            Tweets.created_date > since).order_by(
                Tweets.created_date.desc())
        session.commit()
    except:
        session.rollback()
        raise

    res_list = [row.user_screen_name for row in result]
    mapped = {x: res_list.count(x) for x in res_list}
    filtered_map = dict(
        sorted(
            mapped.items(),
            key=operator.itemgetter(1),
            reverse=True)[
            :10])
    return filtered_map


def update_tweet(tweet_text,
                 tweet_word_set,
                 tweet_link,
                 user_id,
                 user_name,
                 user_screen_name,
                 user_profile_url,
                 created_date):

    session.add(Tweets(
        tweet_text=tweet_text,
        tweet_word_set=tweet_word_set,
        tweet_link=tweet_link,
        user_id=user_id,
        user_name=user_name,
        user_screen_name=user_screen_name,
        user_profile_url=user_profile_url,
        created_date=created_date)
    )

    try:
        session.commit()
    except:
        session.rollback()
