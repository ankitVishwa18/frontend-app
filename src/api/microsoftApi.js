import { getApiUrl } from "./index";

export function getMicrosoftAuthUrl() {
  return `${getApiUrl()}/auth/microsoft`;
}
