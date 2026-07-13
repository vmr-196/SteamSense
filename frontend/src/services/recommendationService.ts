import api from "../api/axios";

function authHeader() {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

// Recently Viewed Recommendation
export async function getRecommendations(appId: number) {
  const response = await api.get(
    `/recommendations/${appId}`
  );

  return response.data;
}

// Wishlist Recommendation
export async function getWishlistRecommendations() {
  const response = await api.get(
    "/recommendations/wishlist",
    authHeader()
  );

  return response.data;
}