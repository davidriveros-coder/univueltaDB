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
  verificacionEnviada?: boolean;
  creadoEn: string;
}

export type EstadoVerificacion = 'no_enviado' | 'pendiente' | 'verificado';

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

export function estadoVerificacion(u: Usuario | null): EstadoVerificacion {
  if (!u) return 'no_enviado';
  if (u.verificado) return 'verificado';
  if (u.verificacionEnviada) return 'pendiente';
  return 'no_enviado';
}

// Lo que se sincroniza a Sheets en create/update: nunca las imágenes
// completas (exceden el límite de 50.000 caracteres por celda) y nunca
// "verificado" — ese campo solo lo cambia el Apps Script cuando un revisor
// humano aprueba el perfil desde el correo de verificación.
export function usuarioParaSheets(u: Usuario) {
  return {
    id: u.id,
    nombre: u.nombre,
    edad: u.edad,
    email: u.email,
    universidad: u.universidad,
    rol: u.rol,
    descripcion: u.descripcion ?? '',
    creadoEn: u.creadoEn,
  };
}

// Envía las 3 fotos al backend para que Apps Script mande el correo de
// verificación a los revisores. Devuelve true si el correo se envió.
export async function solicitarVerificacion(usuario: Usuario): Promise<boolean> {
  if (!documentosCompletos(usuario.documentos)) return false;
  try {
    const res = await fetch('/api/sheets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sheet: 'usuarios',
        action: 'solicitarVerificacion',
        data: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          universidad: usuario.universidad,
          rol: usuario.rol,
          carnetFrente: usuario.documentos?.carnetFrente,
          carnetReverso: usuario.documentos?.carnetReverso,
          credencial: usuario.documentos?.credencial,
        },
      }),
    });
    const data = await res.json();
    if (data?.error) {
      console.error('Solicitar verificación falló:', data.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Solicitar verificación falló:', err);
    return false;
  }
}

// Vuelve a leer el estado real del usuario desde Sheets (lo cambia el
// revisor humano al hacer clic en el correo) y lo refleja en localStorage.
export async function refrescarVerificacion(): Promise<Usuario | null> {
  const u = getUsuario();
  if (!u) return null;
  try {
    const qs = new URLSearchParams({ sheet: 'usuarios', action: 'get', id: u.id }).toString();
    const res = await fetch(`/api/sheets?${qs}`, { cache: 'no-store' });
    const row = await res.json();
    if (row && typeof row.verificado !== 'undefined') {
      const verificado = row.verificado === true || String(row.verificado).toLowerCase() === 'true';
      if (verificado !== !!u.verificado) {
        const updated: Usuario = { ...u, verificado };
        saveUsuario(updated);
        return updated;
      }
    }
  } catch {
    // si falla, seguimos con el estado local
  }
  return u;
}
