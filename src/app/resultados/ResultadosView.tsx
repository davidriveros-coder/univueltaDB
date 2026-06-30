'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { TripCard } from '@/components/TripCard';
import { getAllTrips, formatDateLabel } from '@/lib/services/trips';
import type { Trip } from '@/lib/types';
import { getUserTrips } from '@/lib/client/userTrips';

type ChipMode = 'all' | 'uni' | 'top' | 'cheap' | 'early';

function dateToWeekDay(dateISO: string): number {
  return new Date(`${dateISO}T12:00:00`).getDay();
}

export default function ResultadosView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [chip, setChip] = useState<ChipMode>('all');
  const [allTrips, setAllTrips] = useState<Trip[]>([]);

  const origen = searchParams.get('origen') ?? '';
  const destino = searchParams.get('destino') ?? '';
  const fecha = searchParams.get('fecha') ?? '';
  const soloMujeres = searchParams.get('mujeres') === '1';

  useEffect(() => {
    getAllTrips().then((sheetTrips) => {
      setAllTrips([...getUserTrips(), ...sheetTrips]);
    });
  }, []);

  const filtered = useMemo(() => {
    const weekDay = fecha ? dateToWeekDay(fecha) : undefined;
    return allTrips.filter((t) => {
      if (origen && t.origin !== origen) return false;
      if (destino && t.destination !== destino) return false;
      if (weekDay !== undefined && !t.weekDays.includes(weekDay)) return false;
      if (soloMujeres && t.driver.gender !== 'F') return false;
      return true;
    });
  }, [allTrips, origen, destino, fecha, soloMujeres]);

  const trips = useMemo(() => {
    const list = [...filtered];
    if (chip === 'uni') return list.filter((t) => t.driver.verificationType !== 'Verificado Externo');
    if (chip === 'top') return list.sort((a, b) => b.driver.rating - a.driver.rating);
    if (chip === 'cheap') return list.sort((a, b) => a.priceCLP - b.priceCLP);
    if (chip === 'early') return list.sort((a, b) => a.time.localeCompare(b.time));
    return list;
  }, [filtered, chip]);

  const fechaLabel = fecha ? formatDateLabel(fecha) : 'Todas las fechas';
  const oLabel = origen || 'Cualquier ciudad';
  const dLabel = destino || 'Todos los destinos';

  return (
    <div className="screen" id="s-results">
      <div style={{ background: 'var(--card)' }}>
        <div className="sb" style={{ padding: '0 18px' }}>
          <span>9:41</span>
          <div className="sb-ic">
            <span>●●●</span>
            <span>🔋</span>
          </div>
        </div>
        <div className="res-hdr">
          <div className="res-hdr-top">
            <button className="back dk" onClick={() => router.push('/buscar')}>
              ←
            </button>
            <div className="res-route">
              {oLabel} <span style={{ color: 'var(--txt3)' }}>→</span> {dLabel}
            </div>
          </div>
          <div className="res-meta">
            <span>📅 {fechaLabel}</span>
            <span style={{ color: 'var(--txt3)' }}>·</span>
            <span style={{ color: trips.length > 0 ? 'var(--green)' : 'var(--amber)', fontWeight: 600 }}>
              {trips.length > 0
                ? `${trips.length} viaje${trips.length > 1 ? 's' : ''} disponible${trips.length > 1 ? 's' : ''}`
                : 'Sin resultados'}
            </span>
          </div>
        </div>
      </div>
      <div className="chips">
        <button className={`chip ${chip === 'all' ? 'on' : 'off'}`} onClick={() => setChip('all')}>
          Todos
        </button>
        <button className={`chip ${chip === 'uni' ? 'on' : 'off'}`} onClick={() => setChip('uni')}>
          🎓 Universidad
        </button>
        <button className={`chip ${chip === 'top' ? 'on' : 'off'}`} onClick={() => setChip('top')}>
          ⭐ Mejor valorados
        </button>
        <button className={`chip ${chip === 'cheap' ? 'on' : 'off'}`} onClick={() => setChip('cheap')}>
          💸 Más baratos
        </button>
        <button className={`chip ${chip === 'early' ? 'on' : 'off'}`} onClick={() => setChip('early')}>
          🕐 Antes
        </button>
      </div>
      <div className="res-list">
        {trips.length === 0 ? (
          <div className="empty-state">
            <div className="empty-ico">🔍</div>
            <div className="empty-h">Sin viajes disponibles</div>
            <div className="empty-p">
              No encontramos viajes para esa ruta y fecha.
              <br />
              Prueba con otra fecha o destino.
            </div>
            <button className="btn btn-p" style={{ width: 'auto', padding: '12px 24px', marginTop: 8 }} onClick={() => router.push('/buscar')}>
              Modificar búsqueda
            </button>
          </div>
        ) : (
          trips.map((t) => <TripCard key={t.id} trip={t} />)
        )}
      </div>
      <div className="safe" />
    </div>
  );
}
