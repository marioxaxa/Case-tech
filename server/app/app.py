from flask import Flask

from flask_cors import CORS

from .shop import shop_bp
from .auth import auth_bp

from .models import create_models

from .extensions import db, jwt, migrate



def create_app():
    app = Flask(__name__)

    app.config.from_object('config.Config')

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    CORS(app, origins='*', methods="*", allow_headers="*")

    create_models(app,db)

    app.register_blueprint(shop_bp, url_prefix='/shop')
    app.register_blueprint(auth_bp, url_prefix='/auth')

    return app