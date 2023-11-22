from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class UserPhoto(db.Model):
    __tablename__ = 'userphotos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    userId = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)
    photoUrl = db.Column(db.String(), nullable=False)
    coverPhoto = db.Column(db.Boolean(), nullable=True, default=False)
    created_at = db.Column(db.Date(), nullable=True, default=datetime.now())
    updated_at = db.Column(db.Date(), nullable=True, default=datetime.now())

    user = db.relationship('User', back_populates='userPhoto')
    like = db.relationship('Likes', back_populates='user',cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'photoUrl': self.photoUrl,
            'coverPhoto': self.coverPhoto,
            'created_at': self.created_at
        }
