from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Tweets
from .serializer import RecentTweetSerializer

# Create your views here.


class RecentTweets(APIView):

    def get(self, request):
        keyword = request.query_params.get('keyword', None)
        if keyword is None:
            queryset = Tweets.objects.order_by('-created_date')[:10]
        else:
            queryset = Tweets.objects.filter(tweet_text__contains=keyword).order_by('-created_date')[:10]
        serialized = RecentTweetSerializer(queryset, many=True)

        return Response(serialized.data)

