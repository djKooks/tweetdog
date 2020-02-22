from aiohttp import web

from .db import fetch_tweet, fetch_count_by_time, popular_user, weekly_tweet_count, words_count


routes = web.RouteTableDef()


@routes.get('/api/recent-tweets')
class RecentTweets(web.View):

    async def get(self):
        kwd = None
        if 'keyword' in self.request.rel_url.query:
            kwd = self.request.rel_url.query['keyword']

        data = fetch_tweet(kwd)
        return web.json_response(data)


@routes.get('/api/tweets-count')
class TweetsCount(web.View):
    async def get(self):
        kwd = None
        if 'keyword' in self.request.rel_url.query:
            kwd = self.request.rel_url.query['keyword']

        data = fetch_tweet(kwd)

        return web.json_response(data)


@routes.get('/api/weekly-static')
class WeeklyStatic(web.View):

    async def get(self):
        resp = dict()
        if 'day' in self.request.rel_url.query:
            range_day = self.request.rel_url.query['day']
            count = fetch_count_by_time(int(range_day) * 24)
            resp = {
                'result': 'OK',
                'data': count
            }
        else:
            resp = {
                'result': 'FAIL'
            }

        return web.json_response(resp)


@routes.get('/api/word-set')
class WordSet(web.View):

    async def get(self):
        word_set = words_count()
        resp = {
            'result': 'OK',
            'data': word_set
        }

        return web.json_response(resp)


@routes.get('/api/popular-user')
class PopularUser(web.View):

    async def get(self):
        users = popular_user()
        resp = {
            'result': 'OK',
            'data': users
        }

        return web.json_response(resp)

