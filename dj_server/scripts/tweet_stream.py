import json

from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener

from dateutil import parser, tz

from nagisa import extract

# from tweet_data.model import Tweets
from tweet_data.models import Tweets


class Listener(StreamListener):

    def on_data(self, data):
        all_data = json.loads(data)
        self.__write_db__(all_data)

        return True

    def on_error(self, status):
        print('ERROR:' + status)

    def __write_db__(self, all_data):
        tweet_text = ''
        if all_data['truncated']:
            tweet_text = all_data['extended_tweet']['full_text']
        else:
            tweet_text = all_data['text']

        created_dt = parser.parse(
            all_data['created_at']).astimezone(
            tz.gettz('Asia/Tokyo'))
        user = all_data['user']

        tweet_link = ''
        if 'urls' in all_data['entities'] and len(
                all_data['entities']['urls']) > 0:
            tweet_link = all_data['entities']['urls'][0]['url']

        print(' > receive tweet in ' + all_data['created_at'] + ': ')
        # TODO: more elaborate extract logic
        words = extract(tweet_text, extract_postags=['名詞', '形状詞', '動詞', '感動詞'])
        tweet_word_set = [word for word in words.words if not word.startswith(
            '@') and not word.isnumeric()]

        tweets = Tweets()
        tweets.tweet_text = tweet_text
        tweets.tweet_word_set = ','.join(tweet_word_set)
        tweets.tweet_link = tweet_link
        tweets.user_id = user['id_str']
        tweets.user_name = user['name']
        tweets.user_screen_name = user['screen_name']
        tweets.user_profile_url = user['profile_image_url']
        tweets.created_date = created_dt

        tweets.save()


def run():
    print('run bg task')
    with open('scripts/config.json') as conf:
        config = json.load(conf)
        auth = OAuthHandler(config['CONSUMER_KEY'], config['CONSUMER_SECRET'])
        auth.set_access_token(
            config['ACCESS_TOKEN_KEY'],
            config['ACCESS_TOKEN_SECRET'])

        twitterStream = Stream(auth, Listener())
        twitterStream.filter(track=config['TRACK_KEYWORD_SET'], is_async=True)



