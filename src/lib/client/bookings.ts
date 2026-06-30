'use client';

// Simula la tabla `bookings`. Un INSERT real reemplazará esto cuando exista
// backend; mientras tanto cada solicitud de cupo queda registrada en
// localStorage para que /confirmacion y /chat puedan leerla.

import type { Booking } from '@/lib/types';
import { readJSON, writeJSON } from './localStore';

const KEY = 'univuelta:bookings';

export function getBookings(): Booking[] {
  return readJSON<Booking[]>(KEY, []);
}

export function getBookingForTrip(tripId: string): Booking | undefined {
  return getBookings().find((b) => b.tripId === tripId);
}

export function createBooking(tripId: string, pasajero: { nombre: string; contacto: string }): Booking {
  const existing = getBookingForTrip(tripId);
  if (existing) return existing;

  const booking: Booking = {
    id: `booking-${Date.now()}`,
    tripId,
    status: 'pending',
    requestedAt: new Date().toISOString(),
  };

  const all = getBookings();
  all.unshift(booking);
  writeJSON(KEY, all);

  fetch('/api/sheets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sheet: 'reservas',
      action: 'create',
      data: {
        id: booking.id,
        viaje_id: booking.tripId,
        pasajero_nombre: pasajero.nombre,
        pasajero_contacto: pasajero.contacto,
        estado: booking.status,
        fecha_solicitud: booking.requestedAt,
      },
    }),
  }).catch(() => {});

  return booking;
}
