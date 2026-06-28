from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username == 'admin' and password == 'admin123':
        return jsonify({
            "token": "token-falso-de-prueba-12345",
            "usuario": {
                "username": "admin",
                "rol": "admin"
            }
        }), 200
    else:
        return jsonify({"mensaje": "Credenciales inválidas"}), 401
    

@auth_bp.route('/me', methods=['GET'])
def get_me():
    return jsonify({
        "username": "admin",
        "rol": "admin",
        "nombre": "Administrador del Sistema"
    }), 200