from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from sqlalchemy.sql import func

from app.models.game import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String(50), unique=True, nullable=False)

    email = Column(String(255), unique=True, nullable=False)

    password_hash = Column(Text, nullable=False)

    created_at = Column(TIMESTAMP, server_default=func.now())

    last_login = Column(TIMESTAMP, nullable=True)