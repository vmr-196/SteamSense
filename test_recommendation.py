from ml.recommendation.content import recommend_games

games = recommend_games(
    "Prince of Persia: Warrior Within™"
)

for game in games:
    print(game)