from pydantic import BaseModel


class PersonalizedRecommendationResponse(BaseModel):
    app_id: int
    title: str
    similarity_score: float