from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    commentContent = db.Column(db.String(255), nullable=False)
    userId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    username = db.Column(db.String(), nullable=False)
    postId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False
    )
    created_at = db.Column(db.Date, default=datetime.now)
    updated_at = db.Column(db.Date, default=datetime.now)

    user = db.relationship("User", back_populates="comment")
    post = db.relationship("Post", back_populates="comment")
    like = db.relationship('Like', back_populates='comment',cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "commentContent": self.commentContent,
            "userId": self.userId,
            'username': self.username,
            "postId": self.postId,
            "created_at": self.created_at,
        }
