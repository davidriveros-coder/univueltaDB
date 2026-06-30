'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBookings } from '@/lib/client/bookings';
import { getUserTrips } from '@/lib/client/userTrips';
import { formatCLP } from '@/lib/services/trips';
import type { Booking, Trip } from '@/lib/types';

type Tab = 'reservas' | 'publicados';

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  pending:   { label: 'Pendiente',  color: '#92400e', bg: '#fef3c7' },
  accepted:  { label: 'Aceptado',   color: '#065f46', bg: '#ecfdf5' },
  rejected:  { label: 'Rechazado',  color: '#991b1b', bg: '#fef2f2' },
  cancelled: { label: 'Cancelado',  color: '#374151', bg: '#f3f4f6' },
};

export default function MisViajesPage() {
  const [tab, setTab] = useState<Tab>('reservas');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    setBookings(getBookings());
    setTrips(getUserTrips());
  }, []);

  return (
    <div className="screen" id="s-mis-viajes">
      <div className="mv-hdr">
        <div className="sb" style={{ color: '#fff', padding: '0 4px' }}>
          <span>9:41</span>
          <div className="sb-ic"><span>●●●</span><span>🔋</span></div>
        </div>
        <div style={{ padding: '8px 18px 0', fontSize: 20, fontWeight: 800, color: '#fff' }}>
          Mis viajes
        </div>
        <div className="mv-tabs">
          <button
            className={`mv-tab${tab === 'reservas' ? ' active' : ''}`}
            onClick={() => setTab('reservas')}
          >
            Reservas ({bookings.length})
          </button>
          <button
            className={`mv-tab${tab === 'publicados' ? ' active' : ''}`}
            onClick={() => setTab('publicados')}
          >
            Publicados ({trips.length})
          </button>
        </div>
      </div>

      <div className="mv-body">
        {tab === 'reservas' && (
          bookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-ico">🎟️</div>
              <div className="empty-h">Sin reservas aún</div>
              <div className="empty-p">Busca un viaje y solicita tu cupo.</div>
              <Link href="/buscar" className="btn btn-p" style={{ textAlign: 'center', marginTop: 8, width: 'auto', padding: '12px 24px' }}>
                Buscar viaje →
              </Link>
            </div>
          ) : (
            bookings.map((b) => {
              const s = STATUS_MAP[b.status] ?? STATUS_MAP.pending;
              return (
                <div key={b.id} className="mv-card">
                  <div className="mv-card-top">
                    <div className="mv-card-id">Reserva #{b.id.slice(-6)}</div>
                    <span style={{ background: s.bg, color: s.color, padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 700 }}>
                      {s.label}
                    </span>
                  </div>
                  <div className="mv-card-meta">
                    📅 {new Date(b.requestedAt).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <Link href={`/viaje/${b.tripId}`} className="btn btn-o" style={{ marginTop: 8, fontSize: 14, padding: '10px', textAlign: 'center' }}>
                    Ver viaje
                  </Link>
                </div>
              );
            })
          )
        )}

        {tab === 'publicados' && (
          trips.length === 0 ? (
            <div className="empty-state">
              <div className="empty-ico">🚗</div>
              <div className="empty-h">Aún no has publicado</div>
              <div className="empty-p">Publica un viaje y lleva a otros estudiantes.</div>
              <Link href="/publicar" className="btn btn-s" style={{ textAlign: 'center', marginTop: 8, width: 'auto', padding: '12px 24px' }}>
                Publicar viaje →
              </Link>
            </div>
          ) : (
            trips.map((t) => (
              <div key={t.id} className="mv-card">
                <div className="mv-card-top">
                  <div style={{ fontWeight: 700, color: 'var(--txt)', fontSize: 15 }}>
                    {t.origin} → {t.destination}
                  </div>
                  <div className="mv-price">{formatCLP(t.priceCLP)}</div>
                </div>
                <div className="mv-card-meta">
                  📅 {t.dateLabel} — {t.time} hrs · {t.seatsAvailable} cupo{t.seatsAvailable !== 1 ? 's' : ''}
                </div>
                <Link href={`/viaje/${t.id}`} className="btn btn-o" style={{ marginTop: 8, fontSize: 14, padding: '10px', textAlign: 'center' }}>
                  Ver publicación
                </Link>
              </div>
            ))
          )
        )}
      </div>

      <div className="safe" />
    </div>
  );
}
