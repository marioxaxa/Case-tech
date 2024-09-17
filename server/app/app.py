from flask import Flask

from flask_cors import CORS

from .shop import shop_bp

from .models import create_models

from .db import db


def create_app():
    app = Flask(__name__)

    cors = CORS(app, origins='*')

    app.config.from_object('config.Config')
    db.init_app(app)

    create_models(app,db)

    app.register_blueprint(shop_bp, url_prefix='/shop')

    return app