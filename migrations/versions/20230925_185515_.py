"""create_posts_table

Revision ID: 13229118358a
Revises: ffdc0a98111c
Create Date: 2023-09-25 18:55:15.048038

"""
from alembic import op
import sqlalchemy as sa


import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '13229118358a'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('postTitle', sa.String()),
    sa.Column('postContent', sa.String(length=255), nullable=False),
    sa.Column('imageSrc', sa.String()),
    sa.Column('musicSrc', sa.String()),
    sa.Column('videoSrc', sa.String()),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE posts SET SCHEMA {SCHEMA};")

def downgrade():
     op.drop_table('posts')
