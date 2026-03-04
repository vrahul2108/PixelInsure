const API_BASE_URL = "http://localhost:5000/api";

export const api = async (endpoint: string, options: RequestInit = {}) => {
  let token = localStorage.getItem("accessToken");

  const request = async () => {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });
  };

  let res = await request();

  if (res.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    const refreshRes = await fetch(
      `${API_BASE_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    const refreshData = await refreshRes.json();

    if (!refreshData.accessToken) {
      window.location.href = "/";
      return;
    }

    localStorage.setItem("accessToken", refreshData.accessToken);

    token = refreshData.accessToken;

    res = await request();
  }

  return res.json();
};