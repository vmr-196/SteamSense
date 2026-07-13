-- ==========================================
-- SteamSense Database Schema
-- PostgreSQL
-- ==========================================

CREATE TABLE users (

    id SERIAL PRIMARY KEY,

    username VARCHAR(50) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    last_login TIMESTAMP

);

CREATE TABLE games (

    app_id INTEGER PRIMARY KEY,

    title TEXT NOT NULL,

    description TEXT,

    tags TEXT,

    rating VARCHAR(50),

    rating_score INTEGER,

    positive_ratio INTEGER,

    user_reviews INTEGER,

    price_final NUMERIC,

    price_original NUMERIC,

    discount INTEGER,

    release_year INTEGER,

    game_age INTEGER,

    popularity_score NUMERIC,

    steam_deck BOOLEAN,

    platform_count INTEGER,

    win BOOLEAN,

    mac BOOLEAN,

    linux BOOLEAN

);

CREATE TABLE wishlist (

    wishlist_id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    app_id INTEGER NOT NULL,

    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)

        REFERENCES users(id)

        ON DELETE CASCADE,

    FOREIGN KEY (app_id)

        REFERENCES games(app_id)

        ON DELETE CASCADE

);

CREATE TABLE search_history (

    search_id SERIAL PRIMARY KEY,

    user_id INTEGER,

    search_query TEXT,

    searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)

        REFERENCES users(id)

        ON DELETE CASCADE

);

CREATE TABLE recommendation_history (

    recommendation_id SERIAL PRIMARY KEY,

    user_id INTEGER,

    searched_game INTEGER,

    recommended_game INTEGER,

    similarity_score NUMERIC(5,4),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)

        REFERENCES users(id)

        ON DELETE CASCADE,

    FOREIGN KEY (searched_game)

        REFERENCES games(app_id),

    FOREIGN KEY (recommended_game)

        REFERENCES games(app_id)

);