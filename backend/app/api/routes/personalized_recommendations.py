from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.database.session import get_db
from backend.app.core.dependencies import get_current_user
from backend.app.models.user import User

from backend.app.schemas.personalized_recommendation import (
    PersonalizedRecommendationResponse,
)

from backend.app.services.personalized_recommendation_service import (
    get_personalized_recommendations,
)

router = APIRouter(
    prefix="/recommendations",
    tags=["Personalized Recommendations"],
)


@router.get(
    "/personalized",
    response_model=list[PersonalizedRecommendationResponse],
)
def personalized_recommendations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return get_personalized_recommendations(
        db=db,
        user_id=current_user.id,
    )