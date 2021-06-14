from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from .models import UserModel
from backend import db

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
        password = request.json['password']
        conf_password = request.json['confPassword']

        if password != conf_password:
            return jsonify(
                error="confPassword",
                message="Passwords do not match"
            )
        else:
            return add_user(request)

def add_user(request):
    firstname = request.json['firstName']
    lastname = request.json['lastName']
    email = request.json['email']
    password = request.json['password']

    if(UserModel.query.filter_by(email=email).first() != None):
        return jsonify(
            error="Account with that email already exists"
        )

    hash = generate_password_hash(password, method='sha256')
    newUser = UserModel(firstname, lastname, email, hash)
    db.session.add(newUser)
    db.session.commit()
    return jsonify(
        success="User added to database"
    )