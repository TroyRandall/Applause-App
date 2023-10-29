"""empty message

Revision ID: 9217fb77b574
Revises: 1e94c5f9cc16
Create Date: 2023-10-24 15:51:21.974267

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9217fb77b574'
down_revision = '1e94c5f9cc16'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('userphotos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('photoUrl', sa.String(), nullable=False),
    sa.Column('coverPhoto', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.Date(), nullable=True),
    sa.Column('updated_at', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.alter_column('userId',
               existing_type=sa.INTEGER(),
               nullable=False)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('FBlink', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('InstaLink', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('GHLink', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('GHLink')
        batch_op.drop_column('InstaLink')
        batch_op.drop_column('FBlink')

    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.alter_column('userId',
               existing_type=sa.INTEGER(),
               nullable=True)

    op.drop_table('userphotos')
    # ### end Alembic commands ###