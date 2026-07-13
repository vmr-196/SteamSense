export interface Game {
  app_id: number;
  title: string;

  description?: string;
  tags?: string;

  win?: boolean;
  mac?: boolean;
  linux?: boolean;
  steam_deck?: boolean;

  rating?: string;
  rating_score?: number;
  positive_ratio?: number;
  user_reviews?: number;

  price_final?: number;
  price_original?: number;
  discount?: number;

  release_year?: number;
  game_age?: number;

  platform_count?: number;

  popularity_score?: number;

  similarity_score?: number;
}