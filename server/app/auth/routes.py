from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from flask import  request, jsonify, session

from ..models import User

from . import auth_bp

from ..extensions import db



@auth_bp.route('/', methods=['GET'])
def get_users():
    if not session.get('logged_in'):
        return str('Não logado')
    else:
        return str('Logado')

@auth_bp.route('/register', methods=['POST'])
def register_user():
    user_data = request.get_json()

    required_fields = ['username', 'email', 'password', 'manager']

    if not user_data:
        return jsonify({"error": "Dados do usuário não fornecidos."}), 400

    missing_fields = [field for field in required_fields if field not in user_data]

    if missing_fields:
        return jsonify({"error": f"Os seguintes campos estão faltando: {', '.join(missing_fields)}"}), 400

    if User.query.filter_by(username=user_data["username"]).first():
        return jsonify({"message": "Usuário já existe"}), 409
    try:
        new_user_data = {field: user_data[field] for field in required_fields}
        new_user = User(**new_user_data)
        new_user.set_password(user_data.get("password"))
    except Exception as e:
        return jsonify({"error": f"Ocorreu um erro ao criar o usuario: {str(e)}"}), 400
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario criado com sucesso", "user": str(new_user)}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
   
    user = User.query.filter_by(username=username).first()

    if user is None or not user.check_password(password):
        return jsonify({"msg": "Usuário ou senha inválidos"}), 401
        
    if user and user.check_password(password):
        access_token = create_access_token(identity={'username': user.username, 'is_admin': user.manager})
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Usuário ou senha inválidos"}), 401

@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(logged_in_as=user.username), 200
