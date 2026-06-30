'use client';

// Simula la tabla `messages`. Cuando exista backend, esto se reemplaza por
// suscripciones realtime (Supabase Realtime/WebSocket) en vez de localStorage.

import type { ChatMessage, Trip } from '@/lib/types';
import { readJSON, writeJSON } from './localStore';

const KEY_PREFIX = 'univuelta:chat:';

const AUTO_REPLIES = [
  '¡Perfecto! Cualquier duda me avisas 👍',
  'Anotado. Nos vemos en el punto de salida.',
  '👌 Todo bajo control. ¡Buen viaje!',
  'Claro, sin problema. Cualquier cosa me escribes.',
];

function nowLabel(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export function getMessages(tripId: string): ChatMessage[] {
  return readJSON<ChatMessage[]>(KEY_PREFIX + tripId, []);
}

function saveMessages(tripId: string, messages: ChatMessage[]) {
  writeJSON(KEY_PREFIX + tripId, messages);
}

export function ensureConversationStarted(trip: Trip): ChatMessage[] {
  const existing = getMessages(trip.id);
  if (existing.length > 0) return existing;

  const seed: ChatMessage[] = [
    {
      id: `${trip.id}-seed-1`,
      tripId: trip.id,
      from: 'them',
      text: `¡Hola! Vi tu solicitud para el viaje a ${trip.destination}. ¿Todo bien?`,
      time: nowLabel(),
    },
    {
      id: `${trip.id}-seed-2`,
      tripId: trip.id,
      from: 'them',
      text: `Salimos desde ${trip.originPoint} el ${trip.dateLabel} a las ${trip.time}. Sé puntual por favor 🙏`,
      time: nowLabel(),
    },
  ];
  saveMessages(trip.id, seed);
  return seed;
}

export function sendMessage(tripId: string, text: string): ChatMessage[] {
  const messages = getMessages(tripId);
  messages.push({ id: `${tripId}-${Date.now()}`, tripId, from: 'me', text, time: nowLabel() });
  saveMessages(tripId, messages);
  return messages;
}

export function appendAutoReply(tripId: string): ChatMessage[] {
  const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
  const messages = getMessages(tripId);
  messages.push({ id: `${tripId}-${Date.now()}-r`, tripId, from: 'them', text: reply, time: nowLabel() });
  saveMessages(tripId, messages);
  return messages;
}
