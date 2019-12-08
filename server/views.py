import asyncio
import json
from aiohttp import web

from .db import fetch_tweet, fetch_count_by_time, weekly_tweet_count, words_count


routes = web.RouteTableDef()


@routes.get('/api/recent-tweets')
async def get_recent_tweets(request):
    kwd = None

    if 'keyword' in request.rel_url.query:
        kwd = request.rel_url.query['keyword']

    data = fetch_tweet(kwd)
    resp = {
        'result': 'OK',
        'data': data
    }

    return web.json_response(data)


@routes.get('/api/tweets-count')
async def get_tweets_count(request):
    resp = dict()
    if 'day' in request.rel_url.query:
        range_day = request.rel_url.query['day']
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


@routes.get('/api/weekly-static')
async def get_weekly_static(request):
    weekly_data = weekly_tweet_count()
    resp = {
        'result': 'OK',
        'data': weekly_data
    }

    return web.json_response(resp)


@routes.get('/api/word-set')
async def get_word_set(request):
    word_set = words_count()
    resp = {
        'result': 'OK',
        'data': word_set
    }
    return web.json_response(resp)


@routes.get('/api/test')
async def get_test_result(request):
    return web.Response("TEST")
