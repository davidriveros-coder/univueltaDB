'use client';

// Simula la tabla `trips` para viajes publicados por el usuario desde el
// formulario /publicar. Al conectar la base de datos, esto se reemplaza por
// un INSERT real y un fetch en lib/services/trips.ts.

import { formatDateLabel } from '@/lib/services/trips';
import type { Trip } from '@/lib/types';
import { readJSON, writeJSON } from './localStore';

const KEY = 'univuelta:userTrips';

export interface PublishTripInput {
  origin: string;
  destination: string;
  originPoint: string;
  destinationPoint: string;
  dateISO: string;
  time: string;
  priceCLP: number;
  seatsTotal: number;
  genres: string[];
  sociabilityLevel: 1 | 2 | 3 | 4 | 5;
  driverNote: string;
  driverFullName: string;
  university: string;
}

export function getUserTrips(): Trip[] {
  return readJSON<Trip[]>(KEY, []);
}

export function addUserTrip(input: PublishTripInput): Trip {
  const initials = input.driverFullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

  const trip: Trip = {
    id: `local-${Date.now()}`,
    driver: {
      id: 'local-user',
      fullName: input.driverFullName,
      initials: initials || 'TU',
      avatarClass: 'av-blue',
      gender: 'M',
      verificationType: 'Estudiante Verificado',
      badgeClass: 'b-amber',
      badgeIcon: '⏳',
      university: input.university,
      careerOrRole: 'Pendiente de revisión',
      rating: 0,
      reviewCount: 0,
      vehicle: 'Por confirmar',
    },
    origin: input.origin,
    destination: input.destination,
    originPoint: input.originPoint,
    destinationPoint: input.destinationPoint,
    dateISO: input.dateISO,
    dateLabel: formatDateLabel(input.dateISO),
    time: input.time,
    priceCLP: input.priceCLP,
    seatsTotal: input.seatsTotal,
    seatsAvailable: input.seatsTotal,
    genres: input.genres,
    sociabilityLevel: input.sociabilityLevel,
    driverNote: input.driverNote,
    reviews: [],
    weekDays: [0, 1, 2, 3, 4, 5, 6],
  };

  const current = getUserTrips();
  current.unshift(trip);
  writeJSON(KEY, current);
  return trip;
}
