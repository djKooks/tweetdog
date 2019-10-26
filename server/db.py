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
    Column('tweet_link', String(128), nullable=False),
    Column('user_id', String(32), nullable=False),
    Column('user_name', String(64), nullable=False),
    Column('user_screen_name', String(64), nullable=False),
    Column('user_profile_url', String(128)),
    Column('created_date', DateTime, nullable=False)
)

db_url = DB_URL.format(**config['mysql'])
engine = create_engine(db_url)
conn = engine.connect()


def fetch_tweet(keyword=None):
    if keyword is None:
        result = conn.execute(
            'SELECT * from tweets'
        )
    else:
        result = conn.execute(
            tweets.select(tweets.c.tweet_text.contains(keyword))    
        )
        
    return result

def update_tweet(tweet_text,
                tweet_link,
                user_id,
                user_name,
                user_screen_name,
                user_profile_url,
                created_date):
    
    conn.execute(
        tweets.insert().values(
            tweet_text=tweet_text,
            tweet_link=tweet_link,
            user_id=user_id,
            user_name=user_name,
            user_screen_name=user_screen_name,
            user_profile_url=user_profile_url,
            created_date=created_date
        )
    )
