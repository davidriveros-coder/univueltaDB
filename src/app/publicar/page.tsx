'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CITIES } from '@/lib/mockData';
import { addUserTrip } from '@/lib/client/userTrips';
import { getUsuario, refrescarVerificacion } from '@/lib/client/auth';
import { NOMBRES_UNIVERSIDADES as UNIVERSIDADES } from '@/lib/universidades';
import { LoadingScreen } from '@/components/LoadingScreen';

const GENEROS = ['🎵 Pop', '🎸 Rock', '🔥 Reggaeton', '🎷 Jazz', '🎧 Electrónica', '🌊 Indie', '🎤 Hip-Hop', '🎻 Clásica'];

const SOCIABILIDAD: { value: 1 | 2 | 3 | 4 | 5; label: string }[] = [
  { value: 1, label: '🎧 Introvertido — Prefiero silencio' },
  { value: 2, label: '📖 Reservado — Converso si me hablan' },
  { value: 3, label: '😊 Neutro — Me adapto' },
  { value: 4, label: '💬 Sociable — Me gusta conversar' },
  { value: 5, label: '🎉 Muy Sociable — Bienvenidas las charlas' },
];

export default function PublicarPage() {
  const router = useRouter();
  const [universidad, setUniversidad] = useState(UNIVERSIDADES[0]);
  const [origen, setOrigen] = useState(CITIES[0]);
  const [destino, setDestino] = useState(CITIES[1]);
  const [fecha, setFecha] = useState('2026-05-30');
  const [hora, setHora] = useState('17:00');
  const [generos, setGeneros] = useState<string[]>([]);
  const [sociabilidad, setSociabilidad] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [precio, setPrecio] = useState(4500);
  const [cupos, setCupos] = useState(3);
  const [nombre, setNombre] = useState('');
  const [verificado, setVerificado] = useState<boolean | null>(null);

  useEffect(() => {
    const u = getUsuario();
    if (u) {
      setNombre(u.nombre);
      const match = UNIVERSIDADES.find((un) => un === u.universidad);
      if (match) setUniversidad(match);
    }
    refrescarVerificacion().then((updated) => setVerificado(!!updated?.verificado));
  }, []);

  function toggleGenero(g: string) {
    setGeneros((cur) => (cur.includes(g) ? cur.filter((x) => x !== g) : [...cur, g]));
  }

  function publicar() {
    if (!nombre.trim() || origen === destino) return;
    const trip = addUserTrip({
      origin: origen,
      destination: destino,
      originPoint: `${origen}, punto de encuentro`,
      destinationPoint: `${destino}, punto de llegada`,
      dateISO: fecha,
      time: hora,
      priceCLP: precio,
      seatsTotal: cupos,
      genres: generos.map((g) => g.replace(/^\S+\s/, '')),
      sociabilityLevel: sociabilidad,
      driverNote: 'Viaje recién publicado, pendiente de revisión.',
      driverFullName: nombre,
      university: universidad,
    });
    router.push(`/viaje/${trip.id}`);
  }

  if (verificado === null) {
    return <LoadingScreen text="Verificando tu cuenta…" />;
  }

  if (!verificado) {
    return (
      <div className="screen" id="s-publish">
        <div className="sb" style={{ background: 'var(--card)', padding: '0 20px' }}>
          <span style={{ color: 'var(--txt)' }}>9:41</span>
          <div className="sb-ic" style={{ color: 'var(--txt)' }}>
            <span>●●●</span>
            <span>🔋</span>
          </div>
        </div>
        <div className="pub-hdr">
          <button className="back dk" onClick={() => router.push('/')}>←</button>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Publicar viaje</div>
            <div style={{ fontSize: 13, color: 'var(--txt2)' }}>Ofrece cupos a la comunidad universitaria</div>
          </div>
        </div>
        <div className="gate-wrap">
          <div className="gate-ico">🛡️</div>
          <div className="gate-h">Verifica tu identidad primero</div>
          <div className="gate-p">
            Para publicar viajes necesitas tener tu perfil verificado. Sube tu carnet y credencial en tu perfil y
            espera la aprobación.
          </div>
          <button className="btn btn-p" style={{ width: 'auto', padding: '12px 28px' }} onClick={() => router.push('/perfil')}>
            Ir a mi perfil →
          </button>
        </div>
        <div className="safe" />
      </div>
    );
  }

  return (
    <div className="screen" id="s-publish">
      <div className="sb" style={{ background: 'var(--card)', padding: '0 20px' }}>
        <span style={{ color: 'var(--txt)' }}>9:41</span>
        <div className="sb-ic" style={{ color: 'var(--txt)' }}>
          <span>●●●</span>
          <span>🔋</span>
        </div>
      </div>
      <div className="pub-hdr">
        <button className="back dk" onClick={() => router.push('/')}>
          ←
        </button>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Publicar viaje</div>
          <div style={{ fontSize: 13, color: 'var(--txt2)' }}>Ofrece cupos a la comunidad universitaria</div>
        </div>
      </div>
      <div className="pub-body">
        <div>
          <label className="lbl">Tu nombre</label>
          <input className="inp" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre y apellido" />
        </div>
        <div>
          <label className="lbl">Universidad o institución</label>
          <select className="sel" value={universidad} onChange={(e) => setUniversidad(e.target.value)}>
            {UNIVERSIDADES.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
        <div className="row-2">
          <div>
            <label className="lbl">Origen</label>
            <select className="sel" value={origen} onChange={(e) => setOrigen(e.target.value)}>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="lbl">Destino</label>
            <select className="sel" value={destino} onChange={(e) => setDestino(e.target.value)}>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row-2">
          <div>
            <label className="lbl">Fecha</label>
            <input className="inp" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
          <div>
            <label className="lbl">Hora</label>
            <input className="inp" type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="lbl">Géneros musicales (selecciona)</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 2 }}>
            {GENEROS.map((g) => (
              <button
                key={g}
                type="button"
                className={`genre-chip ${generos.includes(g) ? 'on' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => toggleGenero(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="lbl">Sociabilidad en el viaje</label>
          <select className="sel" value={sociabilidad} onChange={(e) => setSociabilidad(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)}>
            {SOCIABILIDAD.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="lbl">Precio por persona (CLP)</label>
          <div className="price-wrap">
            <span className="price-pfx">$</span>
            <input
              className="inp price-inp"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
            />
          </div>
        </div>
        <div>
          <label className="lbl">Cupos disponibles</label>
          <div className="cupos-row">
            {[1, 2, 3, 4].map((n) => (
              <button key={n} type="button" className={`cupo-btn ${cupos === n ? 'sel' : ''}`} onClick={() => setCupos(n)}>
                {n}
              </button>
            ))}
          </div>
        </div>
        <button className="btn btn-s" onClick={publicar} disabled={!nombre.trim() || origen === destino}>
          Solicitar publicación →
        </button>
        <div className="pub-note">Tu viaje será revisado antes de aparecer en la red</div>
      </div>
      <div className="safe" />
    </div>
  );
}
