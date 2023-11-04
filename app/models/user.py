from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    aboutMe = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(), default='Fan')
    imageUrl = db.Column(db.String(), nullable=True)
    coverphoto = db.Column(db.String(), nullable=True)
    FBlink = db.Column(db.String(), nullable=True)
    InstaLink = db.Column(db.String(), nullable=True)
    GHLink = db.Column(db.String(), nullable = True)

    post=db.relationship('Post', back_populates='user', cascade="all, delete-orphan")
    comment = db.relationship('Comment', back_populates='user', cascade="all, delete-orphan")
    userPhoto = db.relationship('UserPhoto', back_populates='user', cascade='all, delete-orphan')
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'aboutMe': self.aboutMe,
            'role': self.role,
            'imageUrl': self.imageUrl,
            'coverphoto': self.coverphoto,
            'fb': self.FBlink,
            'insta': self.InstaLink,
            'github': self.GHLink
        }
