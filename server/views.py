import asyncio
from aiohttp import web
from aiojobs.aiohttp import setup, spawn


routes = web.RouteTableDef()

@routes.get('/')
async def index(request):
    async with request.app['db'].acquire() as conn:
        cursor = await conn.execute(db.tweets.select())
        records = await cursor.fetchall()
        print(records)
        return web.Response(text='Hello AIOHTTP')
