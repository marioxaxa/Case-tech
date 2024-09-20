import os
from datetime import timedelta
class Config:
    SECRET_KEY = '7fa6b45b-70e6-4e06-9100-ccf065630088'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@localhost/case_tech'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', '4f842a68-f6aa-4902-ae2c-feb69da079ee')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_IDENTITY_CLAIM = "user_id"  
