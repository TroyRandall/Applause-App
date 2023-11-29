from flask import Blueprint, request
from app.models import db, User, Like
from app.forms import CreateLikeForm

like_routes = Blueprint("likes", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

@like_routes.route('/', methods = ['GET'])
def getAllLikes():
    allLikes = Like.query.all()
    return [like.to_dict() for like in allLikes]

@like_routes.route("/comment/<int:commentId>", methods=["GET"])
def likesByComment(commentId):
    commentLikes = Like.query.filter(Like.commentId == commentId)
    return [like.to_dict() for like in commentLikes]

@like_routes.route('/post/<int:postId>', methods =['GET'])
def likesByPost(postId):
    postLikes = Like.query.filter(Like.postId == postId)
    return [like.to_dict() for like in postLikes]


@like_routes.route("/<int:userId>", methods=["GET", "POST"])
def create_get_likes(userId):
    if request.method == "GET":
        userLikes = Like.query.filter(Like.userId == userId)
        return userLikes
    elif request.method == "POST":
        form = CreateLikeForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        print(form.validate())
        if form.validate():
            newLike = Like(
                userId=userId,
                photoId=form.data["photoId"],
                postId=form.data["postId"],
                commentId=form.data["commentId"],
            )

            db.session.add(newLike)
            db.session.commit()
            return {newLike.id: newLike.to_dict()}


@like_routes.route("/<int:id>", methods=["DELETE"])
def delete_like(id):
    userLike = Like.query.get(id)
    if userLike:
        db.session.delete(userLike)
        db.session.commit()
        return {"success": "Like Successfully Deleted"}
    else:
        return {"error": "Unable To Locate Like At This Moment"}
