const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = async (endpoint: string, options: RequestInit = {}) => {
  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken");
  }

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
    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("refreshToken")
        : null;

    if (!refreshToken) {
      if (typeof window !== "undefined") {
        const role = localStorage.getItem("userRole");
        redirectToLogin(role);
      }
      throw new Error("Session expired");
    }

    const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const refreshData = await refreshRes.json();

    if (!refreshData.accessToken) {
      if (typeof window !== "undefined") {
        clearAuthData();
        const role = localStorage.getItem("userRole");
        redirectToLogin(role);
      }
      throw new Error("Session expired");
    }

    localStorage.setItem("accessToken", refreshData.accessToken);
    if (refreshData.refreshToken) {
      localStorage.setItem("refreshToken", refreshData.refreshToken);
    }

    token = refreshData.accessToken;
    res = await request();
  }

  return res.json();
};

// Auth helper functions
export function setAuthData(data: {
  accessToken: string;
  refreshToken: string;
  role: string;
  userId?: string;
}) {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("userRole", data.role);
  if (data.userId) {
    localStorage.setItem("userId", data.userId);
  }
}

export function clearAuthData() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userId");
}

export function getAuthRole(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("userRole");
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("accessToken");
}

function redirectToLogin(role: string | null) {
  if (role === "ADMIN") {
    window.location.href = "/admin/login";
  } else if (role === "SUPER_ADMIN") {
    window.location.href = "/superadmin/login";
  } else {
    window.location.href = "/";
  }
}
