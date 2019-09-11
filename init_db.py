from sqlalchemy import create_engine, MetaData

from server.settings import config
from server.db import tweets


DB_URL = "mysql+pymysql://{user}:{password}@{host}:{port}/{database}"

def create_tables(engine):
    meta = MetaData()
    meta.create_all(bind=engine, tables=[tweets])

db_url = DB_URL.format(**config['mysql'])
engine = create_engine(db_url)

create_tables(engine)
