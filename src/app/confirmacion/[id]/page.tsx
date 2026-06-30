'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/Badge';
import { getTripById, formatCLP } from '@/lib/services/trips';
import type { Trip } from '@/lib/types';
import { getUserTrips } from '@/lib/client/userTrips';

export default function ConfirmacionPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [trip, setTrip] = useState<Trip | undefined>(undefined);

  useEffect(() => {
    const userTrip = getUserTrips().find((t) => t.id === params.id);
    if (userTrip) { setTrip(userTrip); return; }
    getTripById(params.id).then((found) => { if (found) setTrip(found); });
  }, [params.id]);

  if (!trip) return null;

  return (
    <div className="screen" id="s-confirm">
      <div className="sb" style={{ background: '#1D4ED8', color: '#fff', padding: '0 20px' }}>
        <span>9:41</span>
        <div className="sb-ic">
          <span>●●●</span>
          <span>🔋</span>
        </div>
      </div>
      <div className="conf-hero">
        <div className="conf-icon">✅</div>
        <div className="conf-h1">¡Solicitud enviada!</div>
        <div className="conf-sub">
          Tu solicitud fue enviada al conductor.
          <br />
          Te avisaremos cuando la confirme.
        </div>
      </div>
      <div className="conf-body">
        <div className="sum-card">
          <div className="sum-hdr">
            <span className="sum-hdr-t">Resumen del viaje</span>
            <div className="status-chip">
              <div className="s-dot" />
              Pendiente
            </div>
          </div>
          <div className="sum-body">
            <div className="sum-row">
              <span className="sum-lbl">Conductor</span>
              <span className="sum-val">{trip.driver.fullName}</span>
            </div>
            <div className="sum-row">
              <span className="sum-lbl">Ruta</span>
              <span className="sum-val">
                {trip.origin} → {trip.destination}
              </span>
            </div>
            <div className="sum-row">
              <span className="sum-lbl">Fecha y hora</span>
              <span className="sum-val">
                {trip.dateLabel} · {trip.time}
              </span>
            </div>
            <div className="sum-row">
              <span className="sum-lbl">Precio estimado</span>
              <span className="sum-val" style={{ color: 'var(--green)', fontSize: 18 }}>
                {formatCLP(trip.priceCLP)}
              </span>
            </div>
            <div className="div" style={{ margin: '2px 0' }} />
            <div className="sum-row" style={{ alignItems: 'center' }}>
              <span className="sum-lbl">Verificación</span>
              <Badge badgeClass={trip.driver.badgeClass} icon={trip.driver.badgeIcon} label={trip.driver.verificationType} />
            </div>
          </div>
        </div>
        <div className="trust-box">
          <div className="trust-ico">🛡️</div>
          <div className="trust-txt">
            Este viaje es parte de la red UniVuelta. Conductor y pasajero están registrados. Tu información está
            protegida.
          </div>
        </div>
        <div className="conf-acts">
          <button className="btn btn-p" onClick={() => router.push('/')}>
            Volver al inicio
          </button>
          <button className="btn btn-o" onClick={() => router.push(`/chat/${trip.id}`)}>
            💬 Contactar al conductor
          </button>
        </div>
      </div>
      <div className="safe" />
    </div>
  );
}
