import { apiRequest } from "./index";

export async function fetchSubscriptionEmails(token, max = 40) {
  return apiRequest(`/auth/gmail/subscriptions?max=${max}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchMicrosoftSubscriptionEmails(token, max = 40) {
  return apiRequest(`/auth/microsoft/subscriptions?max=${max}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
