from flask import  request, jsonify

from ..models import User

from . import auth_bp

from ..db import db

@auth_bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    return str(users)

@auth_bp.route('/register', methods=['POST'])
def register_user():
    user_data = request.get_json()

    required_fields = ['username', 'email', 'password', 'manager']

    if not user_data:
        return jsonify({"error": "Dados do usuário não fornecidos."}), 400

    missing_fields = [field for field in required_fields if field not in user_data]

    if missing_fields:
        return jsonify({"error": f"Os seguintes campos estão faltando: {', '.join(missing_fields)}"}), 400

    # FALTA ENCRIPTAR A SENHA 

    try:
        new_user_data = {field: user_data[field] for field in required_fields}
        new_user = User(**new_user_data)
    except Exception as e:
        return jsonify({"error": f"Ocorreu um erro ao criar a venda: {str(e)}"}), 400
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario criado com sucesso", "user": new_user}), 201