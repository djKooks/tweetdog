
from django.urls import path

from .views import RecentTweets

urlpatterns = [
    path('recent-tweets', RecentTweets.as_view())
]
