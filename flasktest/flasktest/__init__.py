from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from flasktest.config import Config


app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
mail = Mail(app)
login_manager.login_view = 'users.login'
login_manager.login_message_category = 'info'
login_manager.session_protection = 'strong'
ts = URLSafeTimedSerializer(Config.SECRET_KEY)

from flasktest.users.routes import users
from flasktest.entries.routes import entries
app.register_blueprint(users)
app.register_blueprint(entries)