from datetime import datetime
from pydantic import BaseModel


class RecentlyViewedResponse(BaseModel):
    app_id: int
    title: str
    rating: str
    price_final: float
    viewed_at: datetime

    model_config = {
        "from_attributes": True
    }