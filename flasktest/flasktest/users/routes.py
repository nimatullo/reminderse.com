from flask import Blueprint
from flask import url_for, request, jsonify
from flasktest import db, bcrypt, ts
from flasktest.models import Users, Links, Category, Text
from flasktest.email import send
from flask_login import login_user, current_user, logout_user, login_required

users = Blueprint('users', __name__)

@users.route('/api/register', methods=['POST'])
def post():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')

    hashed_password = bcrypt.generate_password_hash(password).decode('utf8')
    user = Users(username=username.lower().rstrip(), email=email.lower(), password=hashed_password)
    send_email_confirmation(user.email)
    db.session.add(user)
    db.session.commit()

    return jsonify({
        'username': user.username
    }), 201

@users.route('/confirm_email_token/<token>')
def confirm_email_token(token):
    try:
        email = ts.loads(token, salt='email-confirm-key', max_age=1440)
        user = Users.query.filter_by(email=email).first()
        user.email_confirmed = True
        db.session.commit()
        flash('Email Confirmed!', 'success')
        return redirect(url_for('main.home'))
    except:
        flash('Email token expired. Please send a new confirmation.')
        return redirect(url_for('main.home'))

def send_email_confirmation(email):
    token = ts.dumps(email, salt='email-confirm-key')
    html_mid = '''
                <p> <a href="{}">Confirm Email</a></p>
                '''.format(url_for('users.confirm_email_token', token=token, _external=True))
    send(email, html_mid)

@users.route('/api/login', methods=["POST"])
def get_auth_token():
    email = request.json.get("email")
    password = request.json.get("password")
    
    user = Users.query.filter_by(email=email.lower().rstrip()).first()
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        return jsonify({
            'message': f'Welcome {user.username}'
        }), 200
    else:
        return jsonify({
            'message': 'Authentification Failed'
        })

@users.route('/api/logout')
@login_required
def logoutmyhouse():
    logout_user()
    return jsonify({
        "message": "Logged out. Come again."
    })

@users.route('/api/change', methods=['POST'])
@login_required
def change_settings():
    email = request.json.get("email")
    username = request.json.get("username")

    # Check if username is taken
    user = Users.query.filter_by(username=username).first()

    if(user and not current_user.username == username):
        return jsonify({
            "message":"Username is taken."
        }), 409
    else:
        current_user.username = username

    if not current_user.email == email:
        current_user.email = email
        current_user.email_confirmed = False
        send_confirmation(email)
    db.session.commit()

    return jsonify({
        "message": "Changes saved."
    })

@users.route('/api/change+password', methods=['POST'])
@login_required
def change_pass():
    current_password = request.json.get("current_password")
    new_password = request.json.get("new_password")

    if bcrypt.check_password_hash(current_user.password, current_password):
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf8')
        current_user.password = hashed_password
        db.session.commit()
    else:
        return jsonify({
            "message":"Invalid credentials"
        }), 401

    return jsonify({
        "message":"Changes saved."
    }), 200

@users.route("/api/unsubscribe", methods=["DELETE"])
@login_required
def unsub():
    links = Links.query.filter_by(user_id=current_user.id)
    texts = Text.query.filter_by(user_id=current_user.id)
    for link in links:
        db.session.delete(link)
    for text in texts:
        db.session.delete(text)

    db.session.delete(Users.query.filter_by(id=current_user.id).first())
    db.session.commit()
    logout_user()
    
    return jsonify({
        "message": "User deleted."
    })

@users.route("/api/current+user", methods=["GET"])
@login_required
def who_is_logged_in():
    return jsonify({
        "id":current_user.id,
        "username":current_user.username,
        "email":current_user.email
    })