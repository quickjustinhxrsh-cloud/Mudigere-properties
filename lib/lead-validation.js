export function asText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function getHoneypotValue(body) {
  return asText(body.website, 200);
}

export function parseLeadSubmission(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return null;
  }

  const name = asText(body.name, 120);
  const phone = asText(body.phone, 40);
  const email = asText(body.email, 254);
  const message = asText(body.message, 4000);

  if (!name || !phone || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return null;
  }

  return { name, phone, email, message };
}

export function getTurnstileToken(body) {
  return asText(body.turnstileToken, 2048);
}
