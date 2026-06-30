export interface UniversidadInfo {
  nombre: string;
  dominios: string[];
}

// Dominios de correo institucional conocidos por universidad. "Otra institución"
// no exige dominio exacto, pero igual rechaza correos de proveedores públicos.
export const UNIVERSIDADES: UniversidadInfo[] = [
  { nombre: 'UDP — U. Diego Portales', dominios: ['mail.udp.cl', 'udp.cl'] },
  { nombre: 'PUC — Pontificia U. Católica', dominios: ['uc.cl'] },
  { nombre: 'U. de Chile', dominios: ['uchile.cl', 'ug.uchile.cl'] },
  { nombre: 'USACH — U. de Santiago', dominios: ['usach.cl', 'alumnos.usach.cl'] },
  { nombre: 'UAI — U. Adolfo Ibáñez', dominios: ['uai.cl', 'alumnos.uai.cl'] },
  { nombre: 'U. de Valparaíso', dominios: ['uv.cl', 'alumnos.uv.cl'] },
  { nombre: 'U. de Concepción', dominios: ['udec.cl'] },
  { nombre: 'PUCV — P. U. Católica de Valparaíso', dominios: ['pucv.cl'] },
  { nombre: 'U. de La Serena', dominios: ['userena.cl'] },
  { nombre: 'UTEM', dominios: ['utem.cl'] },
  { nombre: 'Otra institución', dominios: [] },
];

export const NOMBRES_UNIVERSIDADES = UNIVERSIDADES.map((u) => u.nombre);

const DOMINIOS_PUBLICOS = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'live.com',
  'icloud.com',
  'protonmail.com',
  'hotmail.es',
  'yahoo.es',
];

export function esCorreoInstitucionalValido(email: string, universidad: string): boolean {
  const dominio = email.split('@')[1]?.toLowerCase().trim();
  if (!dominio) return false;
  if (DOMINIOS_PUBLICOS.includes(dominio)) return false;

  const info = UNIVERSIDADES.find((u) => u.nombre === universidad);
  if (!info || info.dominios.length === 0) return true;

  return info.dominios.some((d) => dominio === d || dominio.endsWith(`.${d}`));
}
