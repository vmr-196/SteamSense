from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import Float
from sqlalchemy import Text


class Base(DeclarativeBase):
    pass


class Game(Base):

    __tablename__ = "games"

    app_id = Column(Integer, primary_key=True)

    title = Column(Text)

    description = Column(Text)

    tags = Column(Text)

    win = Column(Boolean)

    mac = Column(Boolean)

    linux = Column(Boolean)

    steam_deck = Column(Boolean)

    rating = Column(String)

    rating_score = Column(Integer)

    positive_ratio = Column(Integer)

    user_reviews = Column(Integer)

    price_final = Column(Float)

    price_original = Column(Float)

    discount = Column(Integer)

    release_year = Column(Integer)

    game_age = Column(Integer)

    platform_count = Column(Integer)

    popularity_score = Column(Float)