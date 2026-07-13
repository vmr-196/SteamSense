from collections import defaultdict

from sqlalchemy.orm import Session

from backend.app.models.wishlist import Wishlist
from backend.app.models.recently_viewed import RecentlyViewed
from ml.recommendation.content import recommend_games


def get_personalized_recommendations(
    db: Session,
    user_id: int,
    top_k: int = 20,
):
    # Get games from wishlist
    wishlist_games = (
        db.query(Wishlist.app_id)
        .filter(Wishlist.user_id == user_id)
        .all()
    )

    # Get recently viewed games
    recent_games = (
        db.query(RecentlyViewed.app_id)
        .filter(RecentlyViewed.user_id == user_id)
        .all()
    )

    # Combine all source games
    source_games = {
        row.app_id for row in wishlist_games
    } | {
        row.app_id for row in recent_games
    }

    if not source_games:
        return []

    scores = defaultdict(float)
    game_info = {}

    for app_id in source_games:

        recommendations = recommend_games(
            app_id=app_id,
            top_k=10,
        )

        for rec in recommendations:

            if rec["app_id"] in source_games:
                continue

            scores[rec["app_id"]] += rec["similarity_score"]
            game_info[rec["app_id"]] = rec

    ranked = sorted(
        scores.items(),
        key=lambda x: x[1],
        reverse=True,
    )

    results = []

    for app_id, score in ranked[:top_k]:

        game = game_info[app_id].copy()

        game["similarity_score"] = round(score, 4)

        results.append(game)

    return results