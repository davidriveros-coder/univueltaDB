'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveUsuario, type UserRole } from '@/lib/client/auth';

const UNIVERSIDADES = [
  'UDP — U. Diego Portales',
  'PUC — Pontificia U. Católica',
  'U. de Chile',
  'USACH — U. de Santiago',
  'UAI — U. Adolfo Ibáñez',
  'U. de Valparaíso',
  'U. de Concepción',
  'PUCV — P. U. Católica de Valparaíso',
  'U. de La Serena',
  'UTEM',
  'Otra institución',
];

export default function RegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [universidad, setUniversidad] = useState(UNIVERSIDADES[0]);
  const [rol, setRol] = useState<UserRole>('pasajero');

  function crear() {
    if (!nombre.trim() || !email.trim()) return;
    const usuario = {
      id: `u-${Date.now()}`,
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      universidad,
      rol,
      creadoEn: new Date().toISOString(),
    };
    saveUsuario(usuario);
    fetch('/api/sheets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sheet: 'usuarios', action: 'create', data: usuario }),
    }).catch(() => {});
    router.replace('/');
  }

  return (
    <div className="screen" id="s-registro">
      <div className="reg-hero">
        <div className="logo-row" style={{ justifyContent: 'center', marginBottom: 10 }}>
          <div className="logo-ic">🚗</div>
          <span className="logo-nm" style={{ color: '#fff' }}>UniVuelta</span>
        </div>
        <div className="reg-title">Crea tu cuenta</div>
        <div className="reg-sub">Viajes seguros dentro de la comunidad universitaria</div>
      </div>
      <div className="reg-body">
        <div>
          <label className="lbl">Nombre completo</label>
          <input
            className="inp"
            placeholder="Ej: María González"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label className="lbl">Email universitario</label>
          <input
            className="inp"
            type="email"
            placeholder="tu@mail.udp.cl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="lbl">Universidad o institución</label>
          <select className="sel" value={universidad} onChange={(e) => setUniversidad(e.target.value)}>
            {UNIVERSIDADES.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="lbl">¿Cómo usarás UniVuelta?</label>
          <div className="rol-row">
            <button
              type="button"
              className={`rol-btn${rol === 'pasajero' ? ' active' : ''}`}
              onClick={() => setRol('pasajero')}
            >
              <span style={{ fontSize: 24 }}>🎒</span>
              <span style={{ fontWeight: 700 }}>Pasajero</span>
              <span style={{ fontSize: 12, opacity: 0.75 }}>Busco viajes</span>
            </button>
            <button
              type="button"
              className={`rol-btn${rol === 'conductor' ? ' active' : ''}`}
              onClick={() => setRol('conductor')}
            >
              <span style={{ fontSize: 24 }}>🚗</span>
              <span style={{ fontWeight: 700 }}>Conductor</span>
              <span style={{ fontSize: 12, opacity: 0.75 }}>Ofrezco viajes</span>
            </button>
          </div>
        </div>
        <button className="btn btn-p" disabled={!nombre.trim() || !email.trim()} onClick={crear}>
          Crear cuenta →
        </button>
        <div style={{ fontSize: 12, color: 'var(--txt3)', textAlign: 'center', lineHeight: 1.6 }}>
          Al crear una cuenta aceptas los términos de uso.<br />
          Tu información solo es visible para conductores de tus reservas.
        </div>
      </div>
      <div className="safe" />
    </div>
  );
}
