import asyncio
from aiohttp import web
from aiojobs.aiohttp import setup, spawn


routes = web.RouteTableDef()

@routes.get('/')
async def index(request):
    return web.Response(text='Hello AIOHTTP')

async def coro(timeout):
    await asyncio.sleep(timeout)
    print('spawning')

@routes.get('/handler')
async def handler(request):
    await spawn(request, coro(2))
    return web.Response()
