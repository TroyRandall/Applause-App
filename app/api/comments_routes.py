from flask import Blueprint, request
from app.models import Comment, User, db, Post
from app.forms import CreateCommentForm, UpdateCommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:postId>', methods=['GET'])
def get_comments(postId):
    postComments = Comment.query.filter(Comment.postId == postId).all()
    return [comment.to_dict() for comment in postComments]

@comment_routes.route('/<int:postId>', methods=['POST', 'PUT'])
def create_update_comments(postId):
    if(request.method == 'POST'):
        form = CreateCommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        print(form.data)
        if form.validate():
            newComment = Comment(
                commentContent = form.data['commentContent'],
                userId = form.data['userId'],
                username=form.data['username'],
                postId = postId
            )
            print(newComment.to_dict())
            db.session.add(newComment)
            db.session.commit()
            return newComment.to_dict()
    if(request.method == 'PUT'):
        form = UpdateCommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        userComment = Comment.query.get(form.data['id'])
        if(userComment):
            if form.validate():
                userComment.commentContent = form.data['commentContent']

                db.session.commit()
                return userComment.to_dict()
        else:
            return {
                'errors': 'Unable To Locate Comment At This Time, Please Try Again Later'
            }

@comment_routes.route('/<int:commentId>', methods=['DELETE'])
def delete_comment(commentId):
    userComment = Comment.query.get(commentId)
    print(userComment)
    if(userComment):
        db.session.delete(userComment)
        db.session.commit()
        return {
            'success': 'Comment Successfully Deleted'
        }
    else :
        return {
            'errors': 'Unable To Locate Comment At This Time, Please Try Again Later'
        }
