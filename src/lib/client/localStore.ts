'use client';

// Wrapper mínimo sobre localStorage para simular persistencia mientras no hay
// base de datos real. Cada función que lo usa documenta a qué tabla futura
// correspondería (trips, bookings, messages).

function isBrowser() {
  return typeof window !== 'undefined';
}

export function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}
