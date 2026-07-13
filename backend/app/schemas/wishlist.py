from datetime import datetime

from pydantic import BaseModel


class WishlistResponse(BaseModel):
    id: int
    app_id: int
    title: str
    rating: str
    price_final: float
    created_at: datetime

    model_config = {
        "from_attributes": True
    }