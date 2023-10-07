from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    post1 = Post(
        userId=1, postContent='This is my first post I hope you guys like it.'
    )
