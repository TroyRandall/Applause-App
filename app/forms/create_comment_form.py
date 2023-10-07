from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class CreateCommentForm(FlaskForm):
    commentContent = StringField('post comment',validators=[DataRequired()] )
    userId = IntegerField('userId', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired()])
    submit = SubmitField('Submit')
