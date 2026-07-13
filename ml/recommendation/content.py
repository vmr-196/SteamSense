from pathlib import Path

import joblib
from sklearn.metrics.pairwise import cosine_similarity

BASE_DIR = Path(__file__).resolve().parent

games = joblib.load(BASE_DIR / "games.pkl")
tfidf_matrix = joblib.load(BASE_DIR / "tfidf_matrix.pkl")


def recommend_games(
    app_id: int,
    top_k: int = 10,
):

    matches = games[
        games["app_id"] == app_id
    ]

    if matches.empty:
        return []

    idx = matches.index[0]

    similarity_scores = cosine_similarity(
        tfidf_matrix[idx],
        tfidf_matrix,
    ).flatten()

    top_indices = similarity_scores.argsort()[::-1][1:top_k + 1]

    recommendations = games.iloc[top_indices].copy()

    recommendations["similarity_score"] = similarity_scores[top_indices]

    return recommendations[
        [
            "app_id",
            "title",
            "similarity_score",
        ]
    ].to_dict(orient="records")

def recommend_from_wishlist(
    wishlist_app_ids: list[int],
    top_k: int = 10,
):
    import pandas as pd

    if not wishlist_app_ids:
        return []

    scores = {}

    for app_id in wishlist_app_ids:

        recommendations = recommend_games(
            app_id,
            top_k=20,
        )

        for game in recommendations:

            # Skip games already in wishlist
            if game["app_id"] in wishlist_app_ids:
                continue

            if game["app_id"] not in scores:
                scores[game["app_id"]] = {
                    "app_id": game["app_id"],
                    "title": game["title"],
                    "similarity_score": 0,
                    "count": 0,
                }

            scores[game["app_id"]]["similarity_score"] += game[
                "similarity_score"
            ]

            scores[game["app_id"]]["count"] += 1

    recommendations = list(scores.values())

    for game in recommendations:
        game["similarity_score"] /= game["count"]

    recommendations.sort(
        key=lambda x: x["similarity_score"],
        reverse=True,
    )

    return recommendations[:top_k]