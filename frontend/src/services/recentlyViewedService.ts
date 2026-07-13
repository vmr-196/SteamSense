import api from "../api/axios";

export async function addRecentlyViewed(appId: number) {
  const token = localStorage.getItem("token");

  await api.post(
    `/recently-viewed/${appId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function getRecentlyViewed() {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/recently-viewed",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}