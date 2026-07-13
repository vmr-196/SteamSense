import api from "../api/axios";

function authHeader() {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function addToWishlist(appId: number) {
  const response = await api.post(
    `/wishlist/${appId}`,
    {},
    authHeader()
  );

  return response.data;
}

export async function removeFromWishlist(appId: number) {
  const response = await api.delete(
    `/wishlist/${appId}`,
    authHeader()
  );

  return response.data;
}

export async function getWishlist() {
  const response = await api.get(
    "/wishlist",
    authHeader()
  );

  return response.data;
}

export async function isInWishlist(appId: number) {
  const response = await api.get(
    `/wishlist/${appId}`,
    authHeader()
  );

  return response.data.in_wishlist;
}