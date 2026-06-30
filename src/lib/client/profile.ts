'use client';

import { readJSON, writeJSON } from './localStore';

const KEY = 'univuelta:perfil';

export interface Perfil {
  nombre: string;
  contacto: string;
}

export function getPerfil(): Perfil | null {
  return readJSON<Perfil | null>(KEY, null);
}

export function savePerfil(perfil: Perfil): void {
  writeJSON(KEY, perfil);
}
