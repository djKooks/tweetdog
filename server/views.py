import asyncio
import json
from aiohttp import web
from aiojobs.aiohttp import setup, spawn

from .db import fetch_tweet


routes = web.RouteTableDef()

@routes.get('/')
async def index(request):
    async with request.app['db'].acquire() as conn:
        cursor = await conn.execute(db.tweets.select())
        records = await cursor.fetchall()
        print(records)
        return web.Response(text='Hello AIOHTTP')

@routes.get('/api/recent-tweets')
async def get_recent_tweets(request):
    # print('get recent tweets:' + request)
    data = fetch_tweet('100')
    resp = {
        "result": "OK"
    }
    return web.json_response(resp)

