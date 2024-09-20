from .extensions import db
import uuid
from sqlalchemy import PickleType
from werkzeug.security import generate_password_hash, check_password_hash

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
    manager = db.Column(db.Boolean, nullable=False)
    password = db.Column(db.String(256), nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return f'<User {self.username}>'
    
    def as_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'manager': self.manager,
            'password': self.password
        }

class Sale(db.Model):
    id = db.Column(db.String(36),default=lambda: str(uuid.uuid4()), unique=True, primary_key=True)
    is_pending = db.Column(db.Boolean, nullable=False)
    is_cash_payment = db.Column(db.Boolean, nullable=False)
    discount = db.Column(db.Float, nullable=False)
    max_discount = db.Column(db.Float, nullable=False)
    shipping = db.Column(db.Float, nullable=False)
    extra = db.Column(db.Float , nullable=False)
    price = db.Column(db.Float, nullable=False)
    products = db.Column(PickleType, nullable=False)
    seller = db.Column(db.String(36), nullable=False)
    is_aproved = db.Column(db.Boolean, nullable=True)

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
            'products': self.products,
            'seller': self.seller,
            'is_aproved': self.is_aproved
        }

def create_models(app,db):
    with app.app_context():
        db.create_all()