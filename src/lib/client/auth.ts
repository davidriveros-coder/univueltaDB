'use client';

import { readJSON, writeJSON } from './localStore';

const KEY = 'univuelta:usuario';

export type UserRole = 'pasajero' | 'conductor';

export interface DocumentosVerificacion {
  carnetFrente?: string;
  carnetReverso?: string;
  credencial?: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  edad: number;
  email: string;
  universidad: string;
  rol: UserRole;
  descripcion?: string;
  fotoPerfil?: string;
  documentos?: DocumentosVerificacion;
  verificado?: boolean;
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

export function documentosCompletos(docs?: DocumentosVerificacion): boolean {
  return !!docs?.carnetFrente && !!docs?.carnetReverso && !!docs?.credencial;
}

// Lo que se sincroniza a Sheets: nunca las imágenes completas (exceden el
// límite de 50.000 caracteres por celda), solo metadatos + estado de
// verificación, para que quede registrado sin romper el Apps Script.
export function usuarioParaSheets(u: Usuario) {
  return {
    id: u.id,
    nombre: u.nombre,
    edad: u.edad,
    email: u.email,
    universidad: u.universidad,
    rol: u.rol,
    descripcion: u.descripcion ?? '',
    verificado: documentosCompletos(u.documentos),
    creadoEn: u.creadoEn,
  };
}
