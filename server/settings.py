import pathlib
import yaml

BASE_DIR = pathlib.Path(__file__).parent.parent
db_config_path = BASE_DIR / 'server' / 'db.yaml'

def get_config(path):
    with open(path) as f:
        config = yaml.safe_load(f)
        
    return config

config = get_config(db_config_path)
