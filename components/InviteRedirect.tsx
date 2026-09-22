"use client";

import { useEffect } from "react";

export function InviteRedirect() {
  useEffect(() => {
    const inviteType = new URLSearchParams(window.location.hash.slice(1)).get("type");

    if (inviteType === "invite") {
      window.location.replace(`/auth/accept-invite${window.location.hash}`);
    }
  }, []);

  return null;
}
