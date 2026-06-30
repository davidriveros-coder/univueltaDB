'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CITIES } from '@/lib/mockData';

export default function BuscarPage() {
  const router = useRouter();
  const [origen, setOrigen] = useState('Santiago');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('2026-05-30');
  const [soloUni, setSoloUni] = useState(true);
  const [soloVerificado, setSoloVerificado] = useState(true);
  const [soloMujeres, setSoloMujeres] = useState(false);

  function buscar() {
    const params = new URLSearchParams();
    if (origen) params.set('origen', origen);
    if (destino) params.set('destino', destino);
    if (fecha) params.set('fecha', fecha);
    if (soloUni) params.set('uni', '1');
    if (soloVerificado) params.set('verificado', '1');
    if (soloMujeres) params.set('mujeres', '1');
    router.push(`/resultados?${params.toString()}`);
  }

  return (
    <div className="screen" id="s-search">
      <div className="search-hdr">
        <div className="sb" style={{ color: '#fff', padding: '0 4px' }}>
          <span>9:41</span>
          <div className="sb-ic">
            <span>●●●</span>
            <span>🔋</span>
          </div>
        </div>
        <div className="search-hdr-top">
          <button className="back" onClick={() => router.push('/')}>
            ←
          </button>
          <h1>Buscar viaje</h1>
        </div>
        <div className="route-vis">
          <div className="route-dots">
            <div className="rd" />
            <div className="rl" />
            <div className="rd" style={{ background: 'rgba(255,255,255,.5)' }} />
          </div>
          <div className="route-lbl">
            <div className="route-from">{origen || 'Cualquier origen'}</div>
            <div className="route-to">{destino || '¿A dónde vuelves?'}</div>
          </div>
        </div>
      </div>
      <div className="search-body">
        <div>
          <label className="lbl">Origen</label>
          <select className="sel" value={origen} onChange={(e) => setOrigen(e.target.value)}>
            <option value="">Cualquier ciudad...</option>
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
            <option value="">Cualquier destino...</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="lbl">Fecha</label>
          <input className="inp" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div>
          <div className="filt-lbl">Filtros de confianza</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 6 }}>
            <ToggleRow
              icon="🎓"
              title="Solo comunidad universitaria"
              desc="Estudiantes, egresados y vinculados"
              on={soloUni}
              onToggle={() => setSoloUni((v) => !v)}
            />
            <ToggleRow
              icon="✅"
              title="Conductor verificado"
              desc="Con documentos revisados"
              on={soloVerificado}
              onToggle={() => setSoloVerificado((v) => !v)}
            />
            <ToggleRow
              icon="🚺"
              iconBg="#FDF2F8"
              title="Solo conductoras mujeres"
              desc="Filtra solo conductoras de la red"
              on={soloMujeres}
              onToggle={() => setSoloMujeres((v) => !v)}
            />
          </div>
        </div>
        <button className="btn btn-p" style={{ marginTop: 6 }} onClick={buscar}>
          Buscar viajes
        </button>
      </div>
      <div className="safe" />
    </div>
  );
}

function ToggleRow({
  icon,
  iconBg,
  title,
  desc,
  on,
  onToggle,
}: {
  icon: string;
  iconBg?: string;
  title: string;
  desc: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="toggle-row">
      <div className="toggle-lbl">
        <div className="toggle-ico" style={iconBg ? { background: iconBg } : undefined}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: 11, color: 'var(--txt3)' }}>{desc}</div>
        </div>
      </div>
      <button className={`tog ${on ? 'on' : ''}`} onClick={onToggle} aria-label={title} />
    </div>
  );
}
