import api from "../api/axios";

function authHeader() {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function getProfile() {
  const response = await api.get(
    "/auth/profile",
    authHeader()
  );

  return response.data;
}

export async function updateProfile(data: {
  username: string;
  email: string;
}) {
  const token = localStorage.getItem("token");

  const response = await api.put(
    "/auth/profile",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function changePassword(data: {
  current_password: string;
  new_password: string;
}) {
  const token = localStorage.getItem("token");

  const response = await api.put(
    "/auth/profile/password",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}