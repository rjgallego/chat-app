from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from .models import UserModel
from backend import db
from flask_jwt_extended import create_access_token, jwt_required

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        email = request.json["email"]
        password = request.json["password"]
        user = UserModel.query.filter_by(email=email).first()
        if user:
            return login(user, password)
        return jsonify(
            error="Email does not exist"
        )

@auth.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return "<p>Logout</p>"

@auth.route('/sign-up', methods=['POST'])
def sign_up():
    if request.method == 'POST':
        firstname = request.json['firstName']
        lastname = request.json['lastName']
        email = request.json['email']
        password = request.json['password']

        if UserModel.query.filter_by(email=email).first() != None:
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

def login(user, password):
    if check_password_hash(user.hash, password):
        return jsonify(
            token=create_access_token(identity=user.email),
            id=user.id
        )
    return jsonify(
        error="Invalid password"
    )