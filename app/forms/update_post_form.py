from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class UpdatePostForm(FlaskForm):
    id = IntegerField('id')
    userId=IntegerField('userId')
    username = StringField('username')
    postTitle = StringField('post title',validators=[DataRequired()] )
    postContent = StringField('post content', validators=[DataRequired()])
    imageSrc = StringField('image src')
    musicSrc = StringField('music src')
    submit = SubmitField('Submit')
