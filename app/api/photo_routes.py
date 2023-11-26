from flask import Blueprint, request
from app.models import db, User, UserPhoto
from app.forms import CreatePhotoForm, UpdatePhotoForm

photo_routes = Blueprint("photos", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@photo_routes.route("/<int:userId>", methods=["GET"])
def get_user_photos(userId):
    photos = UserPhoto.query.filter(UserPhoto.userId == userId).all()
    print(photos)
    return [photo.to_dict() for photo in photos]


@photo_routes.route("/<int:id>", methods=["POST", "PUT"])
def create_user_photo(id):
    if request.method == "POST":
        form = CreatePhotoForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        print(form.data)
        if form.validate():
            newPhoto = UserPhoto(
                userId=form.data["userId"],
                photoUrl=form.data["photoUrl"],
                coverPhoto=form.data["coverPhoto"],
            )

            db.session.add(newPhoto)
            db.session.commit()
            return newPhoto.to_dict()
        else:
            return {"errors": validation_errors_to_error_messages(form.errors)}, 401
    elif request.method == "PUT":
        form = UpdatePhotoForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate():
            userPhoto = UserPhoto.query.filter(UserPhoto.id == id).all()
            if userPhoto:
                userPhoto.coverPhoto = form.data["coverPhoto"]
                db.session.commit()
                return userPhoto.to_dict()
            else:
                return {
                    "error": "Unable To Locate Photo At This Time, Please Try Again Later"
                }
        else:
            return {
                "error": "Unable To Validation Content Before Submission, Please Adjust Information"
            }
@photo_routes.route('/<int:id>', methods=['DELETE'])
def deletePhoto(id):
    userPhoto = UserPhoto.query.get(id)
    if(userPhoto):
        db.session.delete(userPhoto)
        db.session.commit()
        return {
            'success': 'photo Successfully deleted'
        }
    else:
        return {
            'error': 'Unable To Locate Photo At This Time, Please Try Again Later'
        }
