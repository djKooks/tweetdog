
from django.urls import path

from .views import PopularUsers, RecentTweets, TweetsCount

urlpatterns = [
    path('recent-tweets', RecentTweets.as_view()),
    path('tweet-counts', TweetsCount.as_view()),
    path('popular-user', PopularUsers.as_view())
]
