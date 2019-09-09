from aiohttp import web
from aiojobs.aiohttp import setup

from scheduler import start_scheduler, tweet_stream
from views import routes


app = web.Application()
app.add_routes(routes)

start_scheduler()
# tweet_stream()
web.run_app(app, port=5000)
