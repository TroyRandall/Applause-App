from flask import Blueprint, request
from app.models import db, User, UserPhoto
from app.forms import CreatePhotoForm, UpdatePhotoForm

photo_routes = Blueprint('photos', __name__)

@photo_routes.route('/<int:userId>', methods=['GET'])
def get_user_photos(userId):
    photos = UserPhoto.query.filter(UserPhoto.userId == userId).all()
    return [photo.to_dict() for photo in photos ]

@photo_routes.route('/<int:id>', methods = ['POST', 'PUT'])
def create_user_photo(id):
    if(request.method == 'POST'):
        form=CreatePhotoForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate():
            newPhoto = UserPhoto(
                userId = form.data['userId'],
                photoUrl = form.data['photoUrl'],
                coverPhoto = form.data['coverPhoto']
            )

            db.session.add(newPhoto)
            db.session.commit()
            return newPhoto.to_dict()
        else :
            return {
                'error': 'Unable To Validate Photo Before Creation'
            }
    elif (request.method == 'PUT'):
        form=UpdatePhotoForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate():
            userPhoto = UserPhoto.query.filter(UserPhoto.id == id).all()
            if(userPhoto):
                userPhoto.coverPhoto = form.data['coverPhoto']
                db.session.commit()
                return userPhoto.to_dict()
            else:
                return {
                    'error': 'Unable To Locate Photo At This Time, Please Try Again Later'
                }
        else:
            return {
                'error': 'Unable To Validation Content Before Submission, Please Adjust Information'
            }
