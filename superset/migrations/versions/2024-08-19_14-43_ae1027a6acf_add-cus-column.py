"""Add a column
"""

# revision identifiers, used by Alembic.
revision = 'ae1027a6acf'
down_revision = '17fcea065655'

from alembic import op
import sqlalchemy as sa

def upgrade():
    op.add_column('tag', sa.Column('parent_id', sa.Integer(), nullable=True))

def downgrade():
    op.drop_column('tag', 'parent_id')
