from fastapi import HTTPException
from sqlalchemy.orm import Session

from backend.app.models.game import Game
from backend.app.models.wishlist import Wishlist


def add_to_wishlist(
    db: Session,
    user_id: int,
    app_id: int,
):

    game = (
        db.query(Game)
        .filter(Game.app_id == app_id)
        .first()
    )

    if not game:
        raise HTTPException(
            status_code=404,
            detail="Game not found",
        )

    existing = (
        db.query(Wishlist)
        .filter(
            Wishlist.user_id == user_id,
            Wishlist.app_id == app_id,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Game already in wishlist",
        )

    wishlist = Wishlist(
        user_id=user_id,
        app_id=app_id,
    )

    db.add(wishlist)
    db.commit()

    wishlist_item = (
        db.query(
            Wishlist.id,
            Wishlist.created_at,
            Game.app_id,
            Game.title,
            Game.rating,
            Game.price_final,
        )
        .join(
            Game,
            Wishlist.app_id == Game.app_id,
        )
        .filter(
            Wishlist.user_id == user_id,
            Wishlist.app_id == app_id,
        )
        .first()
    )

    return wishlist_item

def get_user_wishlist(
    db: Session,
    user_id: int,
):

    wishlist = (
        db.query(
            Wishlist.id,
            Wishlist.created_at,
            Game.app_id,
            Game.title,
            Game.rating,
            Game.price_final,
        )
        .join(
            Game,
            Wishlist.app_id == Game.app_id,
        )
        .filter(
            Wishlist.user_id == user_id
        )
        .order_by(
            Wishlist.created_at.desc()
        )
        .all()
    )

    return wishlist

def remove_from_wishlist(
    db: Session,
    user_id: int,
    app_id: int,
):

    wishlist_item = (
        db.query(Wishlist)
        .filter(
            Wishlist.user_id == user_id,
            Wishlist.app_id == app_id,
        )
        .first()
    )

    if wishlist_item is None:
        raise HTTPException(
            status_code=404,
            detail="Game not found in wishlist",
        )

    db.delete(wishlist_item)
    db.commit()

    return {
        "message": "Game removed from wishlist"
    }

def is_in_wishlist(
    db: Session,
    user_id: int,
    app_id: int,
):

    wishlist_item = (
        db.query(Wishlist)
        .filter(
            Wishlist.user_id == user_id,
            Wishlist.app_id == app_id,
        )
        .first()
    )

    return wishlist_item is not None