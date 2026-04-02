import { apiRequest } from "./index";

export async function fetchGmailMessages(token, max = 10, filter = "bills") {
  return apiRequest(
    `/auth/gmail/messages?max=${max}&filter=${encodeURIComponent(filter)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
