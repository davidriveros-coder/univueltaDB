'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUsuario, saveUsuario, clearUsuario, type Usuario } from '@/lib/client/auth';
import { Avatar } from '@/components/Avatar';

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

export default function PerfilPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [universidad, setUniversidad] = useState('');

  useEffect(() => {
    const u = getUsuario();
    if (!u) { router.replace('/registro'); return; }
    setUsuario(u);
    setNombre(u.nombre);
    setEmail(u.email);
    setUniversidad(u.universidad);
  }, [router]);

  function guardar() {
    if (!usuario || !nombre.trim() || !email.trim()) return;
    const updated = { ...usuario, nombre: nombre.trim(), email: email.trim(), universidad };
    saveUsuario(updated);
    fetch('/api/sheets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sheet: 'usuarios', action: 'update', id: updated.id, data: updated }),
    }).catch(() => {});
    setUsuario(updated);
    setEditando(false);
  }

  function cerrarSesion() {
    clearUsuario();
    router.replace('/registro');
  }

  if (!usuario) return null;

  const initials = usuario.nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

  const rolLabel = usuario.rol === 'conductor' ? 'Conductor' : 'Pasajero';
  const rolIcon = usuario.rol === 'conductor' ? '🚗' : '🎒';

  return (
    <div className="screen" id="s-perfil">
      <div className="perf-hero">
        <div className="sb" style={{ color: '#fff', padding: '0 4px' }}>
          <span>9:41</span>
          <div className="sb-ic"><span>●●●</span><span>🔋</span></div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 14, paddingBottom: 28 }}>
          <Avatar
            initials={initials || 'UV'}
            avatarClass="av-blue"
            size={78}
            fontSize={26}
            style={{ margin: '0 auto 14px', border: '3px solid rgba(255,255,255,.3)' }}
          />
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{usuario.nombre}</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,.75)', marginBottom: 12 }}>{usuario.email}</div>
          <span className="perf-rol-chip">{rolIcon} {rolLabel}</span>
        </div>
      </div>

      <div className="perf-body">
        {editando ? (
          <div className="sec">
            <div className="sec-title">Editar perfil</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label className="lbl">Nombre</label>
                <input className="inp" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>
              <div>
                <label className="lbl">Email</label>
                <input className="inp" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="lbl">Universidad</label>
                <select className="sel" value={universidad} onChange={(e) => setUniversidad(e.target.value)}>
                  {UNIVERSIDADES.map((u) => <option key={u}>{u}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-o" onClick={() => setEditando(false)}>Cancelar</button>
                <button
                  className="btn btn-p"
                  disabled={!nombre.trim() || !email.trim()}
                  onClick={guardar}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="sec">
            <div className="sec-title">Información personal</div>
            <InfoRow icon="👤" label="Nombre" value={usuario.nombre} />
            <InfoRow icon="✉️" label="Email" value={usuario.email} />
            <InfoRow icon="🎓" label="Institución" value={usuario.universidad} />
            <InfoRow icon={rolIcon} label="Rol" value={rolLabel} />
            <button className="btn btn-o" style={{ marginTop: 10 }} onClick={() => setEditando(true)}>
              Editar perfil
            </button>
          </div>
        )}

        <div className="sec">
          <div className="sec-title">Cuenta</div>
          <button
            className="btn"
            style={{ background: '#fef2f2', color: '#b91c1c', border: '1.5px solid #fecaca' }}
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="safe" />
    </div>
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
