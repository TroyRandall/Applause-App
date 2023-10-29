from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class CreatePhotoForm(FlaskForm):
    userId = IntegerField("userId", validators=[DataRequired()])
    photoUrl = StringField("photoUrl", validators=[DataRequired()])
    coverPhoto = BooleanField("cover photo", validators=[DataRequired()])
    submit = SubmitField("Submit")
