import atexit
import asyncio
import json

from apscheduler.schedulers.background import BackgroundScheduler

from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener

from dateutil import parser, tz

from .db import update_tweet


class Listener(StreamListener):
    
    def on_data(self, data):
        all_data = json.loads(data)
        self.__write_db__(all_data)
        
        return True

    def on_error(self, status):
        print(status)

    def __write_db__(self, all_data):
        tweet_text = ''
        if all_data['truncated']:
            tweet_text = all_data['extended_tweet']['full_text']
        else:
            tweet_text = all_data['text']
        
        created_dt = parser.parse(all_data['created_at']).astimezone(tz.gettz('Asia/Tokyo'))
        user = all_data['user']
        
        tweet_link = ''
        if 'urls' in all_data['entities'] and len(all_data['entities']['urls']) > 0:
            tweet_link = all_data['entities']['urls'][0]['url']
        
        update_tweet(
            tweet_text,
            tweet_link,
            user['id_str'],
            user['name'],
            user['screen_name'],
            user['profile_image_url'],
            created_dt
        )


def tweet_stream():
    with open('server/config.json') as conf:
        config = json.load(conf)
        auth = OAuthHandler(config['CONSUMER_KEY'], config['CONSUMER_SECRET'])
        auth.set_access_token(config['ACCESS_TOKEN_KEY'], config['ACCESS_TOKEN_SECRET'])
        twitterStream = Stream(auth, Listener())
        twitterStream.filter(track=config['TRACK_KEYWORD_SET'], is_async=True)


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=tweet_stream)
    scheduler.start()

    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())
