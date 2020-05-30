from datetime import datetime, timedelta
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Tweets
from .serializer import PopularUserSerializer, RecentTweetSerializer

# Create your views here.


class RecentTweets(APIView):
    """

    """
    @staticmethod
    def get(request):
        keyword = request.query_params.get('keyword', None)
        if keyword is None:
            queryset = Tweets.objects.order_by('-created_date')[:10]
        else:
            queryset = Tweets.objects.filter(tweet_text__contains=keyword).order_by('-created_date')[:10]
        serialized = RecentTweetSerializer(queryset, many=True)

        return Response(serialized.data)


class TweetsCount(APIView):
    """

    """

    @staticmethod
    def get(request):
        resp = dict()
        range_hour = request.query_params.get('hour', None)
        if range_hour is None:
            range_hour = 24

        since = datetime.now() - timedelta(hours=range_hour)
        query_size = Tweets.objects.filter(created_date__gte=since).count()
        if query_size is not None:
            resp = {
                'result': 'OK',
                'size': query_size
            }
        else:
            resp = {
                'result': 'FAIL'
            }

        return Response(resp)



class PopularUsers(APIView):
    """

    """

    @staticmethod
    def get(request):
        since = datetime.now() - timedelta(hours=3)
        query_set = Tweets.objects \
            .filter(created_date__gte=since)\
            .values_list('user_id', 'user_name').annotate(user_count=Count('user_id')).order_by('-user_count')[:10]

        print(query_set)
        serialize = PopularUserSerializer(query_set, many=True)
        return Response(serialize)


