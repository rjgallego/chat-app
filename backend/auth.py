from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

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

        if len(email) < 4:
            return jsonify(
                error="email",
                message="Invalid email"
            )
        elif len(first_name) < 1:
            return jsonify(
                error="firstName",
                message="First name is required"
            )
        elif len(last_name) < 1:
            return jsonify(
                error="lastName",
                message="Last name is required"
            )
        elif len(password) < 7:
            return jsonify(
                error="password",
                message="Password must be 7 character or more"
            )
        elif password != conf_password:
            return jsonify(
                error="confPassword",
                message="Passwords do not match"
            )
        else:
            return jsonify(
                success="User added to database"
            )
    return "<p>Sign Up</p>"