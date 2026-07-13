from pydantic import BaseModel


class GameResponse(BaseModel):
    app_id: int
    title: str
    description: str | None = None
    tags: str | None = None

    win: bool
    mac: bool
    linux: bool
    steam_deck: bool

    rating: str
    rating_score: int
    positive_ratio: int
    user_reviews: int

    price_final: float
    price_original: float
    discount: int

    release_year: int
    game_age: int

    platform_count: int

    popularity_score: float

    model_config = {
        "from_attributes": True
    }