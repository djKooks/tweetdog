from datetime import datetime, timedelta
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


def _as_dict(row):
    result = dict()
    for key in row.keys():
        if key == 'created_date':
            created = getattr(row, key)
            result[key] = created.strftime("%Y/%m/%d, %H:%M:%S")
        else:
            result[key] = getattr(row, key)

    return result

def fetch_tweet(keyword=None):
    if keyword is None:
        result = conn.execute(
            'SELECT * from tweets ORDER BY created_date DESC LIMIT 10'
        )
    else:
        result = conn.execute(
            tweets.select(
                tweets.c.tweet_text.contains(keyword))
                                    .order_by(tweets.c.created_date.desc())
                                    .limit(10)
        )
        
    return [_as_dict(row) for row in result]


def fetch_by_time(hour=12):
    since = datetime.now() - timedelta(hours=hour)
    result = session.query(Tweets).filter(Tweets.created_date > since).order_by(Tweets.created_date.desc())
    return [_as_dict(row) for row in result]


def update_tweet(tweet_text,
                tweet_link,
                user_id,
                user_name,
                user_screen_name,
                user_profile_url,
                created_date):
    
    session.add(Tweets(
        tweet_text=tweet_text,
        tweet_link=tweet_link,
        user_id=user_id,
        user_name=user_name,
        user_screen_name=user_screen_name,
        user_profile_url=user_profile_url,
        created_date=created_date)
    )

    session.commit()
