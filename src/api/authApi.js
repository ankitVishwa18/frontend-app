import { apiRequest } from "./index";

export async function fetchMe(token) {
  return apiRequest("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
