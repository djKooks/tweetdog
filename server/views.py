import asyncio
import json
from aiohttp import web

from .db import fetch_tweet, fetch_by_time


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

@routes.get('/api/test')
async def get_test_result(request):
    fetch_by_time()
    return web.Response("TEST")

