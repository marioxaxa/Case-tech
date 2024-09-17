from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

from ..models import SKU

from flask import Blueprint

from . import shop_bp

from ..db import db

from ..utils.fill_db import fill_db

@shop_bp.route('/', methods=['GET'])
def teste():
    return "teste"

@shop_bp.route('/fill', methods=['POST'])
def fill():
    products = fill_db()
    return products