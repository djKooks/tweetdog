from sqlalchemy import create_engine, MetaData

from settings import config
from db import tweets


DB_URL = "mysql+pymysql://{user}:{password}@{host}:{port}/{database}"

def create_tables(engine):
    meta = MetaData()
    meta.create_all(bind=engine, tables=[tweets])

if __name__ == '__main__':
    db_url = DB_URL.format(**config['mysql'])
    engine = create_engine(db_url)

    create_tables(engine)
    sample_data(engine)
