import time
import atexit

from apscheduler.schedulers.background import BackgroundScheduler

from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import time
import json


class Listener(StreamListener):
    
    def on_data(self, data):
        all_data = json.loads(data)
        
        print('============================================')
        if all_data['truncated'] == True:
            print(all_data['extended_tweet']['full_text'])
        else:
            print(all_data['text'])
        # print(all_data['user']['screen_name'])
        print(all_data['user']['location'])
        # print(all_data['created_at'])
        if 'urls' in all_data['entities'] and len(all_data['entities']['urls']) > 0:
            print(all_data['entities']['urls'][0]['url'])

        time.sleep(3)
        return True

    def on_error(self, status):
        print(status)


def tweet_stream():
    auth = OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET)
    twitterStream = Stream(auth, Listener())
    twitterStream.filter(track=TRACK_KEYWORD_SET)


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=tweet_stream)
    scheduler.start()

    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())
