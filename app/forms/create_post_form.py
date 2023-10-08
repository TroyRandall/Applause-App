from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class CreatePostForm(FlaskForm):
    postTitle = StringField('post title')
    postContent = StringField('post content', validators=[DataRequired()])
    imageSrc = StringField('image src')
    musicSrc = StringField('music src')
    submit = SubmitField('Submit')
