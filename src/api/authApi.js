import { apiRequest, getApiUrl } from "./index";

export function getGoogleAuthUrl() {
  return `${getApiUrl()}/auth/google`;
}

export async function registerUser(payload) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchMe(token) {
  return apiRequest("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchGmailMessages(token, max = 10, filter = "bills") {
  return apiRequest(`/auth/gmail/messages?max=${max}&filter=${encodeURIComponent(filter)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchSubscriptionEmails(token, max = 40) {
  return apiRequest(`/auth/gmail/subscriptions?max=${max}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
