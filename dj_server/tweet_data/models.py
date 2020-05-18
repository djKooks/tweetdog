from django.db.models import Model, CharField, DateTimeField

# Create your models here.


class Tweets(Model):

    tweet_text = CharField(max_length=1024, blank=False)
    tweet_word_set = CharField(max_length=1024)
    tweet_link = CharField(max_length=128, blank=False)
    user_id = CharField(max_length=32, blank=False)
    user_name = CharField(max_length=64, blank=False)
    user_screen_name = CharField(max_length=64, blank=False)
    user_profile_url = CharField(max_length=128)
    created_date = DateTimeField(auto_now=True)

    class Meta:
        db_table = 'tweets'
