from sqlalchemy.orm import Session

from app.models.game import Game
from app.models.recently_viewed import RecentlyViewed
from sqlalchemy import func

def add_recently_viewed(
    db: Session,
    user_id: int,
    app_id: int,
):
    game = (
        db.query(Game)
        .filter(Game.app_id == app_id)
        .first()
    )

    if game is None:
        return

    existing = (
        db.query(RecentlyViewed)
        .filter(
            RecentlyViewed.user_id == user_id,
            RecentlyViewed.app_id == app_id,
        )
        .first()
    )

    if existing:
        existing.viewed_at = func.now()
        db.commit()
        return

    viewed = RecentlyViewed(
        user_id=user_id,
        app_id=app_id,
    )

    db.add(viewed)
    db.commit()


def get_recently_viewed(
    db: Session,
    user_id: int,
):

    return (
        db.query(
            Game.app_id,
            Game.title,
            Game.rating,
            Game.price_final,
            RecentlyViewed.viewed_at,
        )
        .join(
            RecentlyViewed,
            RecentlyViewed.app_id == Game.app_id,
        )
        .filter(
            RecentlyViewed.user_id == user_id
        )
        .order_by(
            RecentlyViewed.viewed_at.desc()
        )
        .limit(4)
        .all()
    )