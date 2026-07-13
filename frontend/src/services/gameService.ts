import api from "../api/axios";

export async function getPopularGames() {
  const response = await api.get("/games/popular");
  return response.data;
}

export async function searchGames(query: string) {
  const response = await api.get("/search", {
    params: {
      q: query,
    },
  });

  return response.data;
}

export async function getGame(appId: number) {
  const response = await api.get(`/games/${appId}`);
  return response.data;
}