from rest_framework import serializers

from .models import Tweets


class RecentTweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweets
        fields = ('id', 'tweet_text', 'user_name')


class PopularUserSerializer(serializers.ModelSerializer):
    user_count = serializers.IntegerField()

    class Meta:
        model = Tweets
        fields = ('user_id', 'user_name', 'user_count')
