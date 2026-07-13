from sqlalchemy import Column, Integer, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func

from backend.app.models.game import Base


class Wishlist(Base):
    __tablename__ = "wishlist"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    app_id = Column(
        Integer,
        ForeignKey("games.app_id", ondelete="CASCADE"),
        nullable=False,
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.now(),
    )