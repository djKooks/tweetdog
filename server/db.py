from sqlalchemy import (
    MetaData, Table, Column, ForeignKey,
    Integer, String, Date
)

meta = MetaData()

tweets = Table(
    'tweets', meta,
    Column('id', Integer, primary_key=True),
    Column('tweet_text', String(512), nullable=False),
    Column('pub_date', Date, nullable=False)
)
