from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class CreateLikeForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    photoId = IntegerField('photoId')
    commentId = IntegerField('commentId')
    postId = IntegerField('postId')
    submit = SubmitField('Submit')
