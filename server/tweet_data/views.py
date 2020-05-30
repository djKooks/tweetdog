from datetime import datetime, timedelta
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Tweets
from .serializer import PopularUserSerializer, RecentTweetSerializer


class RecentTweets(APIView):
    """
    # TODO
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
    # TODO
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
    # TODO
    """

    @staticmethod
    def get(request):
        since = datetime.now() - timedelta(hours=24)
        query_set = Tweets.objects \
            .filter(created_date__gte=since)\
            .annotate(user_count=Count('user_id')).order_by('-user_count')[:10]

        serialized = PopularUserSerializer(query_set, many=True)
        return Response(serialized.data)


class WeeklyCount(APIView):
    """
    # TODO
    """
    @staticmethod
    def get(request):
        range_hour = 24 * 7
        date_key = '%m/%d'

        since = datetime.now() - timedelta(hours=range_hour)
        query_list = Tweets.objects.filter(created_date__gte=since)
        res_list = [row.created_date.strftime(date_key) for row in query_list]
        mapped = {x: res_list.count(x) for x in res_list}

        return Response(mapped)


class WordCounter(APIView):
    """
    # TODO
    """

    @staticmethod
    def get(request):
        range_hour = 24
        since = datetime.now() - timedelta(hours=range_hour)
        filter_word = ['paypay', 'PayPay', 'RT', 'し', 'Pay', '円', 'ペイ',
                       'フォロー', '名', 'PayPayOfficial', 'いう', 'ツイ', '登録', '企画']

        query_list = Tweets.objects.filter(created_date__gte=since).values('tweet_word_set')
        res_list = list()
        for row in query_list:
            for word in row['tweet_word_set'].split(','):
                if word not in filter_word:
                    res_list.append(word)

        # TODO: optimize the logic!
        mapped = {x: res_list.count(x) for x in res_list}

        return Response(mapped)
