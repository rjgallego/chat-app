from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

from dotenv import load_dotenv
import os
from os.path import join, dirname

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')
CORS(app)

db = SQLAlchemy(app)

from .views import views
from .auth import auth
from .models import UserModel

jwt = JWTManager(app)

app.register_blueprint(views, url_prefix='/')
app.register_blueprint(auth, url_prefix='/')