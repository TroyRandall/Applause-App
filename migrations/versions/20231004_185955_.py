"""create_comments_table

Revision ID: 68af7845bff8
Revises: 13229118358a
Create Date: 2023-10-04 18:59:55.837747

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '68af7845bff8'
down_revision = '13229118358a'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('commentContent', sa.String(length =255), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('postId', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id']),
    sa.ForeignKeyConstraint(['postId'], ['posts.id']),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")

def downgrade():
    op.drop_table('comments')
