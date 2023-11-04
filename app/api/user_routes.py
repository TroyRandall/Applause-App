from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<string:email>')
def userByEmail(email):

    currentUser=User.query.filter(User.email == email).all()
    return currentUser[0].to_dict()

@user_routes.route('/profilephoto/<int:id>', methods=['POST'])
def userProfilePhoto(id):
    currentUser = User.query.get(id)
    url = request.get_json()['url']
    currentUser.imageUrl = url
    db.session.commit()
    return currentUser.to_dict()


@user_routes.route('/coverphoto/<int:id>', methods=['POST'])
def userCoverPhoto(id):
    currentUser = User.query.get(id)
    url = request.get_json()['url']
    print(currentUser.coverphoto)
    currentUser.coverphoto = url
    db.session.commit()
    return currentUser.to_dict()
