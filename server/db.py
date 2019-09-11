from sqlalchemy import (
    create_engine, MetaData, Table, Column, ForeignKey,
    Integer, String, DateTime, 
)

from .settings import config


DB_URL = "mysql+pymysql://{user}:{password}@{host}:{port}/{database}"

meta = MetaData()

tweets = Table(
    'tweets', meta,
    Column('id', Integer, primary_key=True),
    Column('tweet_text', String(512), nullable=False),
    Column('pub_date', DateTime, nullable=False)
)

db_url = DB_URL.format(**config['mysql'])
engine = create_engine(db_url)


def update_tweet(tweet_text, pub_date):
    conn = engine.connect()
    conn.execute(
        tweets.insert().values(
            tweet_text=tweet_text,
            pub_date=pub_date
        )
    )
