# Tweet dog
Tweet stream monitoring board

## How to

#### initiate database
```
$ python makemigration
...
$ python migrate
```

#### run web server
```
$ python manage.py runscript tweet_stream & python manage.py runserver
```

#### start client
```
$ cd client
$ yarn serve
```

