from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class UpdateCommentForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    commentContent = StringField('post comment',validators=[DataRequired()] )
    userId = IntegerField('userId', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired()])
    submit = SubmitField('Submit')
