// Tipos alineados al esquema de base de datos planeado (ver diagrama ER).
// Hoy los datos viven en mockData.ts; cuando se conecte Supabase/Postgres,
// solo cambia la implementación de lib/services/*, no estos tipos.

export type VerificationType =
  | 'Estudiante Verificado'
  | 'Estudiante Verificada'
  | 'Egresado Verificado'
  | 'Egresada Verificada'
  | 'Verificado Plus'
  | 'Verificado Externo';

export type Gender = 'M' | 'F';

export interface SociabilityLevel {
  level: 1 | 2 | 3 | 4 | 5;
  label: string;
  emoji: string;
  desc: string;
}

export interface Review {
  id: string;
  authorName: string;
  stars: number;
  comment: string;
}

export interface Driver {
  id: string;
  fullName: string;
  initials: string;
  avatarClass: string;
  gender: Gender;
  verificationType: VerificationType;
  badgeClass: string;
  badgeIcon: string;
  university: string;
  careerOrRole: string;
  rating: number;
  reviewCount: number;
  vehicle: string;
}

export interface Trip {
  id: string;
  driver: Driver;
  origin: string;
  destination: string;
  originPoint: string;
  destinationPoint: string;
  dateISO: string;
  dateLabel: string;
  time: string;
  priceCLP: number;
  seatsTotal: number;
  seatsAvailable: number;
  genres: string[];
  sociabilityLevel: 1 | 2 | 3 | 4 | 5;
  driverNote: string;
  reviews: Review[];
  /** Días de la semana (0=Dom...6=Sáb) en que este conductor suele viajar. */
  weekDays: number[];
}

export interface SearchFilters {
  origin?: string;
  destination?: string;
  dateISO?: string;
  onlyUniversity?: boolean;
  onlyVerifiedDriver?: boolean;
  onlyWomenDrivers?: boolean;
}

export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface Booking {
  id: string;
  tripId: string;
  status: BookingStatus;
  requestedAt: string;
}

export type MessageSender = 'me' | 'them';

export interface ChatMessage {
  id: string;
  tripId: string;
  from: MessageSender;
  text: string;
  time: string;
}
