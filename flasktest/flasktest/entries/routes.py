from flask url_for, Blueprint, request, jsonify
from flasktest import db
from flasktest.models import Users, Links, Category, Text
from datetime import datetime, timedelta
from flasktest.entries.utils import add_link_to_db, add_text_to_db, category_exists, get_all_links, get_all_texts, generate_links_dict, generate_text_dict
from flask_login import current_user, login_required
from sqlalchemy import or_

entries = Blueprint('entries', __name__)

@entries.route("/api/link/add", methods=["POST"])
@login_required
def add_link():
    entry_title = request.json.get('entry_title')
    url = request.json.get('url')
    category = request.json.get('category')

    add_link_to_db(entry_title, url, category)

    return jsonify({
        'message': "Entry made."
    }), 201

@entries.route("/api/text/add", methods=["POST"])
@login_required
def add_text():
    entry_title = request.json.get('entry_title')
    text_content = request.json.get('text_content')
    category = request.json.get('category')

    add_text_to_db(entry_title, text_content, category)

    return jsonify({
        'message': "Entry made."
    }), 201

@entries.route('/list/get', methods=['GET'])
@login_required
def get():
    entries = get_all_links(current_user.id)
    return jsonify(entries)

@entries.route("/api/link/edit/<link_id>", methods=["PUT"])
@login_required
def edit_link_api(link_id):
    link = Links.query.filter_by(id=link_id).first()
    if not link.user_id == current_user.id:
        return jsonify({
            "message": "You don't have the right privileges."
        }), 403
    else:
        entry_title = request.json.get('entry_title')
        url = request.json.get('url')
        category = request.json.get('category')
        days = request.json.get('days')

        link.entry_title=entry_title
        link.url = url
        if (category):
            category_validtion = category_exists(category)
            link.category_id=category.id
        if (days):
            link.date_of_next_send = link.date_of_next_send + timedelta(days=int(days))
        db.session.commit()
        return jsonify({
            "message" : "Changes saved."
        }), 200

@entries.route("/api/text/edit/<text_id>", methods=["PUT"])
@login_required
def edit_text_api(text_id):
    text = Text.query.filter_by(id=text_id).first()
    if not text.user_id == current_user.id:
        return jsonify({
            "message": "You don't have the right privileges."
        }), 403
    else:
        entry_title = request.json.get('entry_title')
        text_content = request.json.get('text_content')
        category = request.json.get('category')
        days = request.json.get('days')

        text.entry_title=entry_title
        text.text_content = text_content
        if (category):
            category_validtion = category_exists(category)
            text.category_id=category.id
        if (date_of_next_send):
            text.date_of_next_send = text.date_of_next_send + timedelta(days=int(days))
        db.commit()
        return jsonify({
            "message" : "Changes saved."
        }), 200
