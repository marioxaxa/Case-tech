from flask_jwt_extended import  jwt_required
from flask import jsonify, request
from sqlalchemy.inspection import inspect

from ..models import SKU, Sale

from . import shop_bp

from ..utils.fill_db import fill_db

from ..extensions import db

@shop_bp.route('/', methods=['GET'])
def get_products():
    products = SKU.query.all()
    products_list = [product.as_dict() for product in products]
    return jsonify(products_list), 200

@shop_bp.route('/fill', methods=['POST'])
@jwt_required()
def fill():
    products = fill_db()
    return products, 201

@shop_bp.route('/sale', methods=['GET'])
def get_sales():
    sales = Sale.query.all()
    print(sales)
    return str(sales), 200

@shop_bp.route('/sale', methods=['POST'])
@jwt_required()
def create_sale():
    sale_data = request.get_json()

    required_fields = ['is_pending', 'is_cash_payment', 'discount', 'max_discount', 'shipping', 'extra', 'price', 'products']

    if not sale_data:
        return jsonify({"error": "Dados da venda não fornecidos."}), 400

    missing_fields = [field for field in required_fields if field not in sale_data]

    if missing_fields:
        return jsonify({"error": f"Os seguintes campos estão faltando: {', '.join(missing_fields)}"}), 400

    try:
        new_sale_data = {field: sale_data[field] for field in required_fields}
        new_sale = Sale(**new_sale_data)
    except Exception as e:
        return jsonify({"error": f"Ocorreu um erro ao criar a venda: {str(e)}"}), 400
    
    db.session.add(new_sale)
    db.session.commit()

    return str(new_sale), 201

@shop_bp.route('/sales/<sale_id>', methods=['PUT'])
@jwt_required()
def update_sale(sale_id):
    sale_data = request.get_json()

    if not sale_data:
        return jsonify({"error": "Dados da venda não fornecidos."}), 400

    sale = Sale.query.get(sale_id)
    if not sale:
        return jsonify({"error": "Venda não encontrada."}), 404

    mapper = inspect(Sale)
    sale_fields = [column.key for column in mapper.attrs if column.key != 'id']

    for field in sale_fields:
        if field in sale_data:
            setattr(sale, field, sale_data[field])

    try:
        db.session.commit()
        return jsonify({"message": "Venda atualizada com sucesso.", "sale_id": sale.id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Ocorreu um erro ao atualizar a venda: {str(e)}"}), 500
    
@shop_bp.route('/sales/pending', methods=['GET'])
@jwt_required()
def pending_sales():
    pending_sales = Sale.query.filter_by(is_pending=True).all()
    
    return str(pending_sales), 200