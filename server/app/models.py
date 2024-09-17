from .db import db

class SKU(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.String(80), nullable=False)
    produto = db.Column(db.String(320), nullable=False)
    preco_cheio = db.Column(db.Float, nullable=False)
    preco_descontado = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<SKU {self.produto}>'
    

def create_models(app,db):
    with app.app_context():
        db.create_all()