from pydantic import BaseModel

from pydantic import BaseModel

class RecommendationResponse(BaseModel):
    app_id: int
    title: str
    similarity_score: float