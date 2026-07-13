from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.models.wishlist import Wishlist

from app.schemas.recommendation import RecommendationResponse
from ml.recommendation.content import (
    recommend_games,
    recommend_from_wishlist,
)

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"],
)

@router.get("/wishlist")
def wishlist_recommendations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    wishlist = (
        db.query(Wishlist.app_id)
        .filter(
            Wishlist.user_id == current_user.id
        )
        .all()
    )

    app_ids = [
        game.app_id
        for game in wishlist
    ]

    if not app_ids:
        raise HTTPException(
            status_code=404,
            detail="Wishlist is empty",
        )

    return recommend_from_wishlist(app_ids)

@router.get(
    "/{app_id}",
    response_model=list[RecommendationResponse],
)
def get_recommendations(app_id: int):

    recommendations = recommend_games(app_id)

    if not recommendations:
        raise HTTPException(
            status_code=404,
            detail="Game not found",
        )

    return recommendations

