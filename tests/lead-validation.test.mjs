import assert from "node:assert/strict";
import test from "node:test";
import { getHoneypotValue, parseLeadSubmission } from "../lib/lead-validation.js";
import { getPropertyMediaPaths } from "../lib/property-media.js";

test("lead validation accepts a complete inquiry and trims its values", () => {
  assert.deepEqual(parseLeadSubmission({
    name: "  Priya  ", phone: " 9999999999 ", email: " priya@example.com ", message: " Interested "
  }), { name: "Priya", phone: "9999999999", email: "priya@example.com", message: "Interested" });
});

test("lead validation rejects incomplete inquiries and detects honeypot input", () => {
  assert.equal(parseLeadSubmission({ name: "Priya", phone: "", email: "invalid", message: "Hi" }), null);
  assert.equal(getHoneypotValue({ website: "bot.example" }), "bot.example");
});

test("property media cleanup only returns this project's storage paths", () => {
  assert.deepEqual(getPropertyMediaPaths([
    "https://project.supabase.co/storage/v1/object/public/property-media/2026/home%20one.jpg",
    "https://example.com/photo.jpg"
  ], "https://project.supabase.co"), ["2026/home one.jpg"]);
});
