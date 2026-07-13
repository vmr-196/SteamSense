from pathlib import Path

import pandas as pd
from sqlalchemy import create_engine

DATABASE_URL = "postgresql+psycopg2://postgres:admin@localhost:5432/steamsense"

engine = create_engine(DATABASE_URL)

BASE_DIR = Path(__file__).resolve().parent

CSV_PATH = BASE_DIR / "data" / "processed" / "games_content.csv"

games = pd.read_csv(CSV_PATH)

print(f"Loaded {len(games):,} games.")

# Remove unwanted columns
games = games.drop(
    columns=["date_release", "is_free", "content"],
    errors="ignore"
)

# Convert boolean columns
bool_cols = ["win", "mac", "linux", "steam_deck"]

for col in bool_cols:
    games[col] = games[col].fillna(False)
    games[col] = games[col].astype(bool)

# Reorder columns to match PostgreSQL
games = games[
    [
        "app_id",
        "title",
        "description",
        "tags",
        "win",
        "mac",
        "linux",
        "steam_deck",
        "rating",
        "rating_score",
        "positive_ratio",
        "user_reviews",
        "price_final",
        "price_original",
        "discount",
        "release_year",
        "game_age",
        "platform_count",
        "popularity_score",
    ]
]

print(games.dtypes)

games.to_sql(
    "games",
    engine,
    if_exists="append",
    index=False,
    chunksize=1000,
    method="multi",
)

print("✅ Successfully inserted all games!")