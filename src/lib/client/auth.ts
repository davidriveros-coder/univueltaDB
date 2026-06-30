'use client';

import { readJSON, writeJSON } from './localStore';

const KEY = 'univuelta:usuario';

export type UserRole = 'pasajero' | 'conductor';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  universidad: string;
  rol: UserRole;
  creadoEn: string;
}

export function getUsuario(): Usuario | null {
  return readJSON<Usuario | null>(KEY, null);
}

export function saveUsuario(u: Usuario): void {
  writeJSON(KEY, u);
}

export function clearUsuario(): void {
  if (typeof window !== 'undefined') localStorage.removeItem(KEY);
}
