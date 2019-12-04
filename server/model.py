from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Tweets(Base):
    
    __tablename__ = 'tweets'

    id = Column(Integer, primary_key=True)
    tweet_text = Column(String(512), nullable=False)
    tweet_word_set = Column(String(1024))
    tweet_link = Column(String(128), nullable=False)
    user_id = Column(String(32), nullable=False)
    user_name = Column(String(64), nullable=False)
    user_screen_name = Column(String(64), nullable=False)
    user_profile_url = Column(String(128))
    created_date = Column(DateTime, nullable=False)

    def __init__(self,
                tweet_text,
                tweet_word_set, 
                tweet_link, 
                user_id, 
                user_name, 
                user_screen_name, 
                user_profile_url, 
                created_date):
        self.tweet_text = tweet_text
        self.tweet_word_set = tweet_word_set
        self.tweet_link = tweet_link
        self.user_id = user_id
        self.user_name = user_name
        self.user_screen_name = user_screen_name
        self.user_profile_url = user_profile_url
        self.created_date = created_date

    def __repr__(self):
        return "<Tweets('%s', '%s', '%s')>" % (self.user_name, self.created_date, self.tweet_text)
