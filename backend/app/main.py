from fastapi import FastAPI

from backend.app.api.routes.games import router as games_router
from backend.app.api.routes.recommendations import router as recommendation_router
from backend.app.api.routes.auth import router as auth_router
from backend.app.api.routes.wishlist import router as wishlist_router
from backend.app.api.routes.recently_viewed import router as recently_viewed_router
from backend.app.api.routes.personalized_recommendations import (
    router as personalized_router,
)

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="SteamSense API",
    version="1.0.0"
)

app.include_router(games_router)
app.include_router(recommendation_router)
app.include_router(auth_router)
app.include_router(wishlist_router)
app.include_router(recently_viewed_router)
app.include_router(personalized_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)

@app.get("/")
def root():
    return {
        "message": "Welcome to SteamSense 🚀"
    }

from sqlalchemy import text
from backend.app.database.connection import engine

@app.get("/debug-db")
def debug_db():
    with engine.connect() as conn:
        db = conn.execute(text("SELECT current_database()")).scalar()
        schema = conn.execute(text("SELECT current_schema()")).scalar()
        tables = conn.execute(text("""
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema='public'
        """)).fetchall()

    return {
        "database": db,
        "schema": schema,
        "tables": [t[0] for t in tables]
    }