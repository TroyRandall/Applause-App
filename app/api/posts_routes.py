from flask import Blueprint, request
from app.models import Post, db, User
from app.forms import CreatePostForm, UpdatePostForm



post_routes = Blueprint('posts', __name__)

@post_routes.route('/<int:id>', methods=['GET'])
def get_posts(id):
    userPosts = Post.query.filter(Post.userId == id).all()
    print(userPosts)
    return  [post.to_dict() for post in userPosts]

@post_routes.route('/<int:id>', methods=['POST', 'PUT'])
def create_post(id):
    print(request.method)
    if(request.method == 'PUT'):
        currentUser = User.query.get(id)
        form = UpdatePostForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        userPost = Post.query.get(form.data['id'])
        print(userPost.to_dict())
        if form.validate():
                userPost.postTitle=form.data['postTitle']
                userPost.postContent=form.data['postContent']
                userPost.imageSrc=form.data['imageSrc']
                userPost.musicSrc = form.data['musicSrc']
                print(userPost.to_dict())

                db.session.commit()
                return userPost.to_dict()
    elif(request.method == 'POST'):
            currentUser = User.query.get(id)
            form = CreatePostForm()
            print(form.data)
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate():
                newPost = Post(
                    userId = currentUser.id,
                    username=currentUser.username,
                    postTitle=form.data['postTitle'],
                    postContent=form.data['postContent'],
                    imageSrc = form.data['imageSrc'],
                    musicSrc = form.data['musicSrc']
                )
                db.session.add(newPost)
                db.session.commit()
                return newPost.to_dict()
    return {'errors': 'Unable To Create Post At The Moment. Please Try Again Later'}, 401

@post_routes.route('/<int:id>', methods=['DELETE'])
def delete_post(id):
    userPost = Post.query.get(id)
    print(userPost)
    currentUser = User.query.get(userPost.userId)
    if(userPost):
        db.session.delete(userPost)
        db.session.commit()
        allUserPosts = Post.query.filter(Post.userId == currentUser.id)
        return  [post.to_dict() for post in allUserPosts]
    else:
        return {'error': 'Unable To Locate Post At This Time, Please Try Again Later'}
