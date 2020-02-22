from aiohttp import web
import aiohttp_cors

from .scheduler import start_scheduler, tweet_stream
from .views import routes


app = web.Application()
app.add_routes(routes)

# Configure default CORS settings.
cors = aiohttp_cors.setup(app, defaults={
    "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
        )
})

for route in list(app.router.routes()):
    cors.add(route)

start_scheduler()

web.run_app(app, port=5000, access_log=None)
