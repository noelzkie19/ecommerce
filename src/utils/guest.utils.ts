const GUEST_ID_KEY = "guest_id";

export const getGuestId = (): string => {
  if (globalThis.window === undefined) return "";

  let guestId = localStorage.getItem(GUEST_ID_KEY);
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem(GUEST_ID_KEY, guestId);
  }
  return guestId;
};

export const clearGuestId = (): void => {
  if (globalThis.window === undefined) return;
  localStorage.removeItem(GUEST_ID_KEY);
};
