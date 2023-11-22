from .db import db,environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Like(db.Model):
    __tablename__='likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id=db.Column(db.Integer(), primary_key=True)
    userId=db.Column(db.Integer(),  db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    postId = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=True)
    photoId = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("userPhotos.id")), nullable=True)
    commentId = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("comments.id")), nullable=True)
    created_at = db.Column(db.Date, default = datetime.now)
    updated_at = db.Column(db.Date, default = datetime.now)

    user = db.relationship("User", back_populates='like')
    comment = db.relationship("Comment", back_populates='like')
    photo = db.relationship("UserPhoto", back_populates='like')

    def to_dict(self):
        return {
            'id': self.id,
            'postId': self.postId,
            'photoId': self.photoId,
            'commentId': self.commentId,
            'createdAt': self.created_at,
        }
