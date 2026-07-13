from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.database.session import get_db
from backend.app.models.game import Game
from backend.app.schemas.game import GameResponse
from backend.app.core.dependencies import get_current_user_optional
from backend.app.models.user import User
from backend.app.services.recently_viewed_service import add_recently_viewed
router = APIRouter(tags=["Games"])


@router.get(
    "/games",
    response_model=list[GameResponse]
)
def get_games(db: Session = Depends(get_db)):

    return db.query(Game).limit(20).all()

from fastapi import HTTPException

@router.get(
    "/games/popular",
    response_model=list[GameResponse]
)
def popular_games(
    db: Session = Depends(get_db)
):

    return (
        db.query(Game)
        .order_by(Game.popularity_score.desc())
        .limit(20)
        .all()
    )

@router.get(
    "/games/{app_id}",
    response_model=GameResponse
)
def get_game(
    app_id: int,
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):

    game = (
        db.query(Game)
        .filter(Game.app_id == app_id)
        .first()
    )

    if game is None:
        raise HTTPException(
            status_code=404,
            detail="Game not found"
        )

    # Record the view only if the user is logged in
    if current_user is not None:
        add_recently_viewed(
            db=db,
            user_id=current_user.id,
            app_id=app_id,
        )

    return game    

from fastapi import Query


@router.get(
    "/search",
    response_model=list[GameResponse]
)
def search_games(
    q: str = Query(..., min_length=2),
    db: Session = Depends(get_db)
):

    games = (
        db.query(Game)
        .filter(Game.title.ilike(f"%{q}%"))
        .limit(20)
        .all()
    )

    return games

