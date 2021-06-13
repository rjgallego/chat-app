from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from .models import UserModel

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        print(str(request.json))
        return request.json["email"]

@auth.route('/logout')
def logout():
    return "<p>Logout</p>"

@auth.route('/sign-up', methods=['POST'])
def sign_up():
    if request.method == 'POST':
        first_name = request.json['firstName']
        last_name = request.json['lastName']
        email = request.json['email']
        password = request.json['password']
        conf_password = request.json['confPassword']

        if password != conf_password:
            return jsonify(
                error="confPassword",
                message="Passwords do not match"
            )
        else:
            encrypted = generate_password_hash(password, method='sha256')
            return jsonify(
                success="User added to database"
            )
