from rest_framework import serializers

from .models import Tweets


class RecentTweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweets
        fields = ('id', 'tweet_text', 'user_name')
