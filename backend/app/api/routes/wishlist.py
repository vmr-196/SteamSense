from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.database.session import get_db
from backend.app.core.dependencies import get_current_user
from backend.app.models.user import User
from backend.app.schemas.wishlist import WishlistResponse
from backend.app.services.wishlist_service import add_to_wishlist
from backend.app.services.wishlist_service import (
    add_to_wishlist,
    get_user_wishlist,
    remove_from_wishlist,
    is_in_wishlist,
)
router = APIRouter(
    prefix="/wishlist",
    tags=["Wishlist"]
)


@router.post(
    "/{app_id}",
    response_model=WishlistResponse,
    status_code=201
)
def add_game(
    app_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return add_to_wishlist(
        db=db,
        user_id=current_user.id,
        app_id=app_id,
    )

@router.get(
    "",
    response_model=list[WishlistResponse],
)
def view_wishlist(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return get_user_wishlist(
        db=db,
        user_id=current_user.id,
    )
@router.get("/{app_id}")
def wishlist_status(
    app_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return {
        "in_wishlist": is_in_wishlist(
            db=db,
            user_id=current_user.id,
            app_id=app_id,
        )
    }

@router.delete("/{app_id}")
def delete_wishlist_game(
    app_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return remove_from_wishlist(
        db=db,
        user_id=current_user.id,
        app_id=app_id,
    )