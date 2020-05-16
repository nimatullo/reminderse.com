from flask import url_for, Blueprint, request, jsonify, make_response, render_template
from flasktest import db
from flasktest.models import Users, Links, Category, Text
from datetime import timedelta
from flasktest.entries.utils import add_link_to_db, add_text_to_db, category_exists, get_all_links, get_all_texts, generate_links_dict, generate_text_dict
from flask_login import current_user, login_required
import uuid

entries = Blueprint('entries', __name__)


@entries.route("/")
def main():
    return render_template("index.html")


@entries.route("/api/link/add", methods=["POST"])
@login_required
def add_link():
    if request.is_json:
        entry_title = request.json.get('entry_title')
        url = request.json.get('url')
        category = request.json.get('category')

        add_link_to_db(entry_title, url, category)

        return make_response(jsonify({'message': "Entry made."}), 201)
    else:
        return make_response(jsonify({"message": "Request body must be JSON"}), 400)


@entries.route("/api/text/add", methods=["POST"])
@login_required
def add_text():
    entry_title = request.json.get('entry_title')
    text_content = request.json.get('text_content')
    category = request.json.get('category')

    add_text_to_db(entry_title, text_content, category)

    return jsonify({'message': "Entry made."}), 201


@entries.route('/api/link/list', methods=['GET'])
@login_required
def all_links():
    entries = get_all_links(current_user.id)
    return jsonify(entries), 200


@entries.route('/api/text/list', methods=['GET'])
@login_required
def all_texts():
    entries = get_all_texts(current_user.id)
    return jsonify(entries), 200


@entries.route("/api/link/<link_id>", methods=["PUT"])
@login_required
def edit_link_api(link_id):
    link = Links.query.filter_by(id=link_id).first()
    if not link.user_id == current_user.id:
        return jsonify({"message": "You don't have the right privileges."}), 403
    else:
        entry_title = request.json.get('entry_title')
        url = request.json.get('url')
        category = request.json.get('category')
        days = request.json.get('days')

        link.entry_title = entry_title
        link.url = url
        if (category == ""):
            link.category_id = None
        elif(category):
            category_validation = category_exists(category)
            link.category_id = category_validation.id
        if (days):
            link.date_of_next_send = link.date_of_next_send + \
                timedelta(days=int(days))
        db.session.commit()
        return jsonify({"message": "Changes saved."}), 200


@entries.route("/api/text/<text_id>", methods=["PUT"])
@login_required
def edit_text_api(text_id):
    text = Text.query.filter_by(id=text_id).first()
    if not text.user_id == current_user.id:
        return jsonify({"message": "You don't have the right privileges."}), 403
    else:
        entry_title = request.json.get('entry_title')
        text_content = request.json.get('text_content')
        category = request.json.get('category')
        days = request.json.get('days')

        text.entry_title = entry_title
        text.text_content = text_content
        if (category == ""):
            text.category_id = None
        elif(category):
            category_validation = category_exists(category)
            text.category_id = category_validation.id
        if (days):
            text.date_of_next_send = text.date_of_next_send + \
                timedelta(days=int(days))
        db.session.commit()
        return jsonify({"message": "Changes saved."}), 200


@entries.route('/api/link/<link_id>', methods=['GET'])
@login_required
def get_link(link_id):
    link = Links.query.filter_by(
        user_id=current_user.id).filter_by(id=link_id).first()

    if not link:
        return make_response(jsonify({"message": "Link cannot be found."}), 404)
    else:
        category = Category.query.filter_by(id=link.category_id).first()
        if category:
            category = category.title
        else:
            category = None
        return make_response(jsonify({
            "id": link.id,
            "entry_title": link.entry_title,
            "url": link.url,
            "category": category
        }), 200)


@entries.route('/api/text/<text_id>', methods=['GET'])
@login_required
def get_text(text_id):
    text = Text.query.filter_by(
        user_id=current_user.id).filter_by(id=text_id).first()

    if not text:
        return make_response(jsonify({"message": "Text cannot be found."}), 404)
    else:
        category = Category.query.filter_by(id=text.category_id).first()
        if category:
            category = category.title
        else:
            category = None
        return make_response(jsonify({
            "id": text.id,
            "entry_title": text.entry_title,
            "text_content": text.text_content,
            "category": category
        }), 200)


@entries.route('/api/link/<link_id>', methods=['DELETE'])
@login_required
def delete_link(link_id):
    link = Links.query.filter_by(
        user_id=current_user.id).filter_by(id=link_id).first()

    if not link:
        return make_response(jsonify({"message": "Link does not exists"}), 404)
    else:
        db.session.delete(link)
        db.session.commit()
        return make_response(jsonify({"message": "Link deleted"}), 200)


@entries.route('/api/text/<text_id>', methods=['DELETE'])
@login_required
def delete_text(text_id):
    text = Text.query.filter_by(
        user_id=current_user.id).filter_by(id=text_id).first()

    if not text:
        return make_response(jsonify({"message": "Text does not exists"}), 404)
    else:
        db.session.delete(text)
        db.session.commit()
        return make_response(jsonify({"message": "Text deleted"}), 200)


@entries.route('/api/search/', methods=["GET"])
@login_required
def search():
    query = request.args.get('query')
    category = Category.query.filter_by(title=query).first()
    if category:
        category_id = category.id
    else:
        category_id = str(uuid.uuid4())

    text = (Text.query.filter_by(user_id=current_user.id).filter_by(entry_title=query)).union(
        Text.query.filter_by(user_id=current_user.id).filter_by(category_id=category_id))
    texts = generate_text_dict(text)

    link = (Links.query.filter_by(user_id=current_user.id).filter_by(entry_title=query)).union(
        Links.query.filter_by(user_id=current_user.id).filter_by(category_id=category_id))
    links = generate_links_dict(link)

    entries = [links, texts]

    return make_response(jsonify(entries), 200)
