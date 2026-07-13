from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.core.dependencies import get_current_user
from backend.app.database.session import get_db
from backend.app.models.user import User
from backend.app.schemas.recently_viewed import RecentlyViewedResponse
from backend.app.services.recently_viewed_service import (
    add_recently_viewed,
    get_recently_viewed,
)

router = APIRouter(
    prefix="/recently-viewed",
    tags=["Recently Viewed"],
)


@router.post("/{app_id}", status_code=201)
def add_game_to_recently_viewed(
    app_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return add_recently_viewed(
        db=db,
        user_id=current_user.id,
        app_id=app_id,
    )


@router.get(
    "",
    response_model=list[RecentlyViewedResponse],
)
def view_recently_viewed(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_recently_viewed(
        db=db,
        user_id=current_user.id,
    )