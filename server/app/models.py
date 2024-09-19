from .db import db
import uuid
from sqlalchemy import PickleType

class SKU(db.Model):
    id = db.Column(db.String(36),default=lambda: str(uuid.uuid4()), unique=True, primary_key=True)
    sku = db.Column(db.String(80), nullable=False)
    produto = db.Column(db.String(320), nullable=False)
    preco_cheio = db.Column(db.Float, nullable=False)
    preco_descontado = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<SKU {self.produto}>'
    
    def as_dict(self):
        return {
            'id': self.id,
            'sku': self.sku,
            'produto': self.produto,
            'preco_cheio': self.preco_cheio,
            'preco_descontado': self.preco_descontado
        }
    

class User(db.Model):
    id = db.Column(db.String(36),default=lambda: str(uuid.uuid4()), unique=True, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(80), nullable=False)
    manager = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'
    
    def as_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'manager': self.manager
            # 'password' intencionalmente não incluído por questões de segurança
        }


class Sale(db.Model):
    id = db.Column(db.String(36),default=lambda: str(uuid.uuid4()), unique=True, primary_key=True)
    is_pending = db.Column(db.Boolean, nullable=False)
    is_cash_payment = db.Column(db.Boolean, nullable=False)
    discount = db.Column(db.Float, nullable=False)
    max_discount = db.Column(db.Float, nullable=False)
    shipping = db.Column(db.Float, nullable=False)
    extra = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)
    products = db.Column(PickleType, nullable=False)

    def __repr__(self):
        return f'<Sale {self.id}>'
    
    def as_dict(self):
        return {
            'id': self.id,
            'is_pending': self.is_pending,
            'is_cash_payment': self.is_cash_payment,
            'discount': self.discount,
            'max_discount': self.max_discount,
            'shipping': self.shipping,
            'extra': self.extra,
            'price': self.price,
            'products': self.products  
        }

def create_models(app,db):
    with app.app_context():
        db.create_all()