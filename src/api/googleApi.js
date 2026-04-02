import { getApiUrl } from "./index";

export function getGoogleAuthUrl() {
  return `${getApiUrl()}/auth/google`;
}
