from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
    __tablename__='posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id=db.Column(db.Integer(), primary_key=True)
    userId=db.Column(db.Integer(),  db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    username=db.Column(db.String(), nullable=False)
    postTitle = db.Column(db.String())
    postContent = db.Column(db.String(255), nullable=False)
    imageSrc = db.Column(db.String())
    musicSrc = db.Column(db.String())
    videoSrc = db.Column(db.String())
    created_at = db.Column(db.Date, default = datetime.now)
    updated_at = db.Column(db.Date, default = datetime.now)


    user = db.relationship("User", back_populates="post")
    comment = db.relationship('Comment', back_populates='post', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'username': self.username,
            'postTitle': self.postTitle,
            'postContent': self.postContent,
            'imageSrc': self.imageSrc,
            'musicSrc': self.musicSrc,
            'videoSrc': self.videoSrc,
            'created_at': self.created_at,
        }
