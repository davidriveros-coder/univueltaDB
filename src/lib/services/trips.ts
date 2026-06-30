import type { SearchFilters, Trip, VerificationType } from '@/lib/types';

// En el servidor usamos la URL de Apps Script directamente (sin CORS).
// En el browser usamos el proxy local /api/sheets (evita CORS).
const API =
  typeof window === 'undefined'
    ? process.env.SHEETS_EXEC!
    : '/api/sheets';

// ── Mapas de estilos ─────────────────────────────────────────────────────────

const AVATAR_COLORS = ['av-blue', 'av-pink', 'av-green', 'av-amber', 'av-purple', 'av-teal'];

const BADGE_MAP: Record<string, { badgeClass: string; badgeIcon: string }> = {
  'Estudiante Verificado':  { badgeClass: 'b-blue',   badgeIcon: '🎓' },
  'Estudiante Verificada':  { badgeClass: 'b-blue',   badgeIcon: '🎓' },
  'Egresado Verificado':    { badgeClass: 'b-purple',  badgeIcon: '🏛️' },
  'Egresada Verificada':    { badgeClass: 'b-purple',  badgeIcon: '🏛️' },
  'Verificado Plus':        { badgeClass: 'b-amber',  badgeIcon: '⭐' },
  'Verificado Externo':     { badgeClass: 'b-teal',   badgeIcon: '🔗' },
};

// ── Tipos de fila cruda ───────────────────────────────────────────────────────

interface SheetRow {
  id: string | number;
  conductor_nombre: string;
  conductor_iniciales: string;
  conductor_genero: string;
  conductor_tipo_verificacion: string;
  conductor_universidad: string;
  conductor_carrera: string;
  conductor_rating: string | number;
  conductor_resenas: string | number;
  vehiculo: string;
  origen: string;
  destino: string;
  punto_origen: string;
  punto_destino: string;
  fecha: string | number;
  hora: string | number;
  precio: string | number;
  cupos_totales: string | number;
  cupos_disponibles: string | number;
  generos_musicales: string;
  sociabilidad: string | number;
  nota_conductor: string;
  estado: string;
}

// ── Helpers de conversión ─────────────────────────────────────────────────────

function idHash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffff;
  return h;
}

// Sheets puede devolver fechas como número serial (días desde 1899-12-30)
function parseDate(raw: string | number): string {
  if (typeof raw === 'number') {
    const ms = (raw - 25569) * 86400000;
    const d = new Date(ms);
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    return `${d.getUTCFullYear()}-${mm}-${dd}`;
  }
  return String(raw);
}

// Sheets puede devolver horas como fracción del día (0.708333 = 17:00)
function parseTime(raw: string | number): string {
  if (typeof raw === 'number') {
    const mins = Math.round(raw * 24 * 60);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }
  return String(raw);
}

// ── Mapper fila → Trip ────────────────────────────────────────────────────────

function rowToTrip(row: SheetRow): Trip {
  const badge = BADGE_MAP[row.conductor_tipo_verificacion] ?? { badgeClass: 'b-blue', badgeIcon: '🎓' };
  const id = String(row.id);
  const dateISO = parseDate(row.fecha);
  const weekDay = new Date(`${dateISO}T12:00:00`).getDay();

  return {
    id,
    driver: {
      id: `driver-${id}`,
      fullName: row.conductor_nombre,
      initials: row.conductor_iniciales,
      avatarClass: AVATAR_COLORS[idHash(id) % AVATAR_COLORS.length],
      gender: row.conductor_genero as 'M' | 'F',
      verificationType: row.conductor_tipo_verificacion as VerificationType,
      badgeClass: badge.badgeClass,
      badgeIcon: badge.badgeIcon,
      university: row.conductor_universidad,
      careerOrRole: row.conductor_carrera,
      rating: Number(row.conductor_rating),
      reviewCount: Number(row.conductor_resenas),
      vehicle: row.vehiculo,
    },
    origin: row.origen,
    destination: row.destino,
    originPoint: row.punto_origen,
    destinationPoint: row.punto_destino,
    dateISO,
    dateLabel: formatDateLabel(dateISO),
    time: parseTime(row.hora),
    priceCLP: Number(row.precio),
    seatsTotal: Number(row.cupos_totales),
    seatsAvailable: Number(row.cupos_disponibles),
    genres: String(row.generos_musicales).split('|'),
    sociabilityLevel: Number(row.sociabilidad) as 1 | 2 | 3 | 4 | 5,
    driverNote: row.nota_conductor,
    reviews: [],
    weekDays: [weekDay],
  };
}

// ── Fetch helpers ─────────────────────────────────────────────────────────────

async function fetchRows(extra: Record<string, string> = {}): Promise<SheetRow[]> {
  const qs = new URLSearchParams({ sheet: 'viajes', action: 'list', ...extra }).toString();
  const res = await fetch(`${API}?${qs}`, { cache: 'no-store' });
  return res.json();
}

// ── API pública ───────────────────────────────────────────────────────────────

export async function getAllTrips(): Promise<Trip[]> {
  const rows = await fetchRows();
  return rows.filter((r) => r.estado === 'activo').map(rowToTrip);
}

export async function getTripById(id: string): Promise<Trip | undefined> {
  const qs = new URLSearchParams({ sheet: 'viajes', action: 'get', id }).toString();
  const res = await fetch(`${API}?${qs}`, { cache: 'no-store' });
  const row: SheetRow | null = await res.json();
  if (!row || !row.id) return undefined;
  return rowToTrip(row);
}

export async function searchTrips(filters: SearchFilters): Promise<Trip[]> {
  const { origin, destination, dateISO, onlyWomenDrivers } = filters;
  const extra: Record<string, string> = {};
  if (origin) extra.origen = origin;
  if (destination) extra.destino = destination;
  let trips = (await fetchRows(extra)).filter((r) => r.estado === 'activo').map(rowToTrip);
  if (dateISO) {
    const weekDay = new Date(`${dateISO}T12:00:00`).getDay();
    trips = trips.filter((t) => t.weekDays.includes(weekDay));
  }
  if (onlyWomenDrivers) trips = trips.filter((t) => t.driver.gender === 'F');
  return trips;
}

// ── Utilidades de formato (exportadas, usadas en UI) ─────────────────────────

export function formatDateLabel(dateISO: string): string {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const d = new Date(`${dateISO}T12:00:00`);
  return `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]}`;
}

export function formatCLP(value: number): string {
  return `$${value.toLocaleString('es-CL')}`;
}
