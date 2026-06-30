'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { GenreChips } from '@/components/GenreChips';
import { SociabilityBar } from '@/components/SociabilityBar';
import { LoadingScreen } from '@/components/LoadingScreen';
import { getTripById, formatCLP } from '@/lib/services/trips';
import type { Trip } from '@/lib/types';
import { getUserTrips } from '@/lib/client/userTrips';
import { createBooking } from '@/lib/client/bookings';
import { getPerfil, savePerfil } from '@/lib/client/profile';
import { getUsuario } from '@/lib/client/auth';

export default function DetallePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [trip, setTrip] = useState<Trip | undefined>(undefined);
  const [cargando, setCargando] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');

  useEffect(() => {
    const userTrip = getUserTrips().find((t) => t.id === params.id);
    if (userTrip) { setTrip(userTrip); setCargando(false); return; }
    getTripById(params.id).then((found) => {
      if (found) setTrip(found);
      setCargando(false);
    });
  }, [params.id]);

  if (cargando) {
    return <LoadingScreen text="Buscando viaje…" />;
  }

  if (!trip) {
    return (
      <div className="screen" id="s-detail">
        <div className="empty-state">
          <div className="empty-ico">🔍</div>
          <div className="empty-h">Viaje no encontrado</div>
          <button className="btn btn-p" style={{ width: 'auto', padding: '12px 24px', marginTop: 8 }} onClick={() => router.push('/resultados')}>
            Volver a resultados
          </button>
        </div>
      </div>
    );
  }

  function solicitarCupo() {
    if (!trip) return;
    const perfil = getPerfil();
    if (perfil) {
      createBooking(trip.id, perfil);
      router.push(`/confirmacion/${trip.id}`);
    } else {
      const usuario = getUsuario();
      if (usuario) setNombre(usuario.nombre);
      setShowModal(true);
    }
  }

  function confirmar() {
    if (!trip || !nombre.trim() || !contacto.trim()) return;
    const perfil = { nombre: nombre.trim(), contacto: contacto.trim() };
    savePerfil(perfil);
    createBooking(trip.id, perfil);
    router.push(`/confirmacion/${trip.id}`);
  }

  const isExterno = trip.driver.verificationType === 'Verificado Externo';
  const trustText = isExterno
    ? 'Conductor externo con verificación avanzada: antecedentes, documentos y más de 50 viajes previos revisados.'
    : 'Viaje dentro de una red validada para comunidad universitaria. Conductor con documentos revisados en UniVuelta.';

  return (
    <>
      <div className="screen" id="s-detail">
        <div className="det-hero">
          <div className="sb" style={{ color: '#fff', padding: '0 4px' }}>
            <span>9:41</span>
            <div className="sb-ic">
              <span>●●●</span>
              <span>🔋</span>
            </div>
          </div>
          <div className="det-hero-top">
            <button className="back" onClick={() => router.back()}>
              ←
            </button>
            <span className="det-hero-lbl">Detalle del viaje</span>
          </div>
          <div className="det-profile">
            <Avatar
              initials={trip.driver.initials}
              avatarClass={trip.driver.avatarClass}
              size={68}
              fontSize={23}
              style={{ border: '3px solid rgba(255,255,255,.3)' }}
            />
            <div className="det-info">
              <div className="det-name">{trip.driver.fullName}</div>
              <div className="det-sub">
                {trip.driver.careerOrRole} · {trip.driver.university}
              </div>
              <div className="det-rating">
                <span className="stars">★★★★★</span>
                <span style={{ fontWeight: 700 }}>{trip.driver.rating}</span>
                <span style={{ color: 'rgba(255,255,255,.6)', fontSize: 13 }}>
                  ({trip.driver.reviewCount} reseñas)
                </span>
              </div>
            </div>
          </div>
          <div className="det-badge-row">
            <Badge
              badgeClass={trip.driver.badgeClass}
              icon={trip.driver.badgeIcon}
              label={trip.driver.verificationType}
              style={{ fontSize: 12, padding: '5px 13px' }}
            />
          </div>
        </div>
        <div className="det-body">
          <div className="trust-box">
            <div className="trust-ico">🛡️</div>
            <div className="trust-txt">{trustText}</div>
          </div>
          <div className="sec">
            <div className="sec-title">Detalle del viaje</div>
            <InfoRow icon="📍" label="Punto de salida" value={trip.originPoint} />
            <InfoRow icon="🎯" label="Destino" value={trip.destinationPoint} />
            <InfoRow icon="🕐" label="Fecha y hora" value={`${trip.dateLabel} — ${trip.time} hrs`} />
            <InfoRow icon="💺" label="Cupos disponibles" value={`${trip.seatsAvailable} asiento${trip.seatsAvailable > 1 ? 's' : ''}`} />
            <InfoRow icon="🚗" label="Vehículo" value={trip.driver.vehicle} />
          </div>
          <div className="sec">
            <div className="sec-title">Perfil del conductor</div>
            <div className="irow" style={{ paddingBottom: 13 }}>
              <span className="i-ico">🎵</span>
              <div style={{ width: '100%' }}>
                <div className="i-lbl">Géneros musicales favoritos</div>
                <div className="genres-wrap" style={{ marginTop: 6 }}>
                  <GenreChips genres={trip.genres} />
                </div>
              </div>
            </div>
            <div className="irow" style={{ borderBottom: 'none' }}>
              <span className="i-ico">💬</span>
              <div style={{ width: '100%' }}>
                <div className="i-lbl">Sociabilidad en el viaje</div>
                <div style={{ marginTop: 6 }}>
                  <SociabilityBar level={trip.sociabilityLevel} />
                </div>
              </div>
            </div>
          </div>
          <div className="sec">
            <div className="sec-title">Nota del conductor</div>
            <div style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, fontStyle: 'italic' }}>{trip.driverNote}</div>
          </div>
          <div className="sec">
            <div className="sec-title">Reseñas recientes</div>
            {trip.reviews.length === 0 ? (
              <div style={{ fontSize: 13, color: 'var(--txt3)' }}>Aún sin reseñas.</div>
            ) : (
              trip.reviews.map((r) => (
                <div className="rev-item" key={r.id}>
                  <Avatar initials={r.authorName.substring(0, 2)} avatarClass="av-blue" size={32} fontSize={11} />
                  <div>
                    <div className="rev-name">
                      {r.authorName} <span className="stars">{'★'.repeat(r.stars)}</span>
                    </div>
                    <div className="rev-text">{r.comment}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="det-bar">
          <div>
            <div className="det-price-big">{formatCLP(trip.priceCLP)}</div>
            <div className="det-price-sub">por persona</div>
          </div>
          <button className="btn btn-p" style={{ width: 'auto', padding: '14px 22px' }} onClick={solicitarCupo}>
            Solicitar cupo →
          </button>
        </div>
        <div className="safe" />
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-handle" />
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--txt)' }}>Tus datos de contacto</div>
            <div style={{ fontSize: 14, color: 'var(--txt2)', marginTop: -6 }}>
              El conductor los recibirá para coordinar el viaje.
            </div>
            <div>
              <label className="lbl">Tu nombre</label>
              <input
                className="inp"
                placeholder="Ej: María González"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div>
              <label className="lbl">WhatsApp o teléfono</label>
              <input
                className="inp"
                placeholder="+56 9 1234 5678"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
              />
            </div>
            <button
              className="btn btn-p"
              disabled={!nombre.trim() || !contacto.trim()}
              onClick={confirmar}
            >
              Confirmar solicitud →
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="irow">
      <span className="i-ico">{icon}</span>
      <div>
        <div className="i-lbl">{label}</div>
        <div className="i-val">{value}</div>
      </div>
    </div>
  );
}
