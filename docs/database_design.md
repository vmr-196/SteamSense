# 🎮 SteamSense Database Design

## Overview

SteamSense uses PostgreSQL as the primary relational database.

The database stores:

- User accounts
- Steam game information
- User wishlists
- Search history
- AI recommendation history

---

## Tables

1. users
2. games
3. wishlist
4. search_history
5. recommendation_history

## users

| Column | Type | Description |
|---------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique user ID |
| username | VARCHAR(50) | Username |
| email | VARCHAR(255) UNIQUE | User email |
| password_hash | TEXT | Hashed password |
| created_at | TIMESTAMP | Account creation date |
| last_login | TIMESTAMP | Last login timestamp |


## games

| Column | Type |
|---------|------|
| app_id | INTEGER PRIMARY KEY |
| title | TEXT |
| description | TEXT |
| tags | TEXT |
| rating | VARCHAR(50) |
| rating_score | INTEGER |
| positive_ratio | INTEGER |
| user_reviews | INTEGER |
| price_final | NUMERIC |
| price_original | NUMERIC |
| discount | INTEGER |
| release_year | INTEGER |
| game_age | INTEGER |
| popularity_score | NUMERIC |
| steam_deck | BOOLEAN |
| platform_count | INTEGER |
| win | BOOLEAN |
| mac | BOOLEAN |
| linux | BOOLEAN |


## wishlist

| Column | Type | Description |
|---------|------|-------------|
| wishlist_id | SERIAL PRIMARY KEY | Wishlist item ID |
| user_id | INTEGER | References users.id |
| app_id | INTEGER | References games.app_id |
| added_at | TIMESTAMP | Date added |


## search_history

| Column | Type | Description |
|---------|------|-------------|
| search_id | SERIAL PRIMARY KEY | Search ID |
| user_id | INTEGER | References users.id |
| search_query | TEXT | User search |
| searched_at | TIMESTAMP | Search timestamp |


## recommendation_history

| Column | Type | Description |
|---------|------|-------------|
| recommendation_id | SERIAL PRIMARY KEY | Recommendation ID |
| user_id | INTEGER | References users.id |
| searched_game | INTEGER | References games.app_id |
| recommended_game | INTEGER | References games.app_id |
| similarity_score | NUMERIC(5,4) | Recommendation confidence |
| created_at | TIMESTAMP | Recommendation timestamp |