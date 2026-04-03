export function getAuthToken() {
  return localStorage.getItem("token");
}

export function setAuthToken(token) {
  localStorage.setItem("token", token);
}

export function clearAuthToken() {
  localStorage.removeItem("token");
}

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  return atob(normalized + padding);
}

export function getAuthUserFromToken(token) {
  if (!token) return null;

  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;

    const payload = JSON.parse(decodeBase64Url(payloadPart));
    if (!payload?.id) return null;

    return {
      id: payload.id,
      name: payload.name || "",
      email: payload.email || "",
    };
  } catch (_error) {
    return null;
  }
}
