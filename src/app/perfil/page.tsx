'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  getUsuario,
  saveUsuario,
  clearUsuario,
  usuarioParaSheets,
  documentosCompletos,
  type Usuario,
} from '@/lib/client/auth';
import { fileToCompressedDataUrl } from '@/lib/client/imageUtils';
import { NOMBRES_UNIVERSIDADES, esCorreoInstitucionalValido } from '@/lib/universidades';
import { Avatar } from '@/components/Avatar';

export default function PerfilPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [universidad, setUniversidad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  useEffect(() => {
    const u = getUsuario();
    if (!u) { router.replace('/registro'); return; }
    setUsuario(u);
    setNombre(u.nombre);
    setEdad(String(u.edad ?? ''));
    setEmail(u.email);
    setUniversidad(u.universidad);
    setDescripcion(u.descripcion ?? '');
    setFotoPerfil(u.fotoPerfil ?? '');
  }, [router]);

  function sincronizar(updated: Usuario) {
    fetch('/api/sheets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sheet: 'usuarios', action: 'update', id: updated.id, data: usuarioParaSheets(updated) }),
    }).catch(() => {});
  }

  function guardar() {
    if (!usuario || !nombre.trim() || !email.trim() || Number(edad) < 16) return;
    if (!esCorreoInstitucionalValido(email.trim(), universidad)) {
      setErrorEmail('Usa tu correo institucional de la universidad seleccionada.');
      return;
    }
    const updated: Usuario = {
      ...usuario,
      nombre: nombre.trim(),
      edad: Number(edad),
      email: email.trim(),
      universidad,
      descripcion: descripcion.trim(),
      fotoPerfil: fotoPerfil || undefined,
    };
    saveUsuario(updated);
    sincronizar(updated);
    setUsuario(updated);
    setEditando(false);
    setErrorEmail('');
  }

  async function onFotoPerfil(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToCompressedDataUrl(file, 700, 0.7);
    setFotoPerfil(dataUrl);
  }

  async function onDocumento(e: React.ChangeEvent<HTMLInputElement>, campo: 'carnetFrente' | 'carnetReverso' | 'credencial') {
    if (!usuario) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToCompressedDataUrl(file, 900, 0.7);
    const updated: Usuario = {
      ...usuario,
      documentos: { ...usuario.documentos, [campo]: dataUrl },
    };
    saveUsuario(updated);
    sincronizar(updated);
    setUsuario(updated);
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
  const verificado = documentosCompletos(usuario.documentos);

  return (
    <div className="screen" id="s-perfil">
      <div className="perf-hero">
        <div className="sb" style={{ color: '#fff', padding: '0 4px' }}>
          <span>9:41</span>
          <div className="sb-ic"><span>●●●</span><span>🔋</span></div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 14, paddingBottom: 28 }}>
          <label className="perf-photo-edit">
            <Avatar
              initials={initials || 'UV'}
              avatarClass="av-blue"
              size={78}
              fontSize={26}
              src={usuario.fotoPerfil}
              style={{ margin: '0 auto 14px', border: '3px solid rgba(255,255,255,.3)' }}
            />
            {editando && (
              <>
                <span className="perf-photo-edit-badge">✏️</span>
                <input type="file" accept="image/*" onChange={onFotoPerfil} style={{ display: 'none' }} />
              </>
            )}
          </label>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{usuario.nombre}</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,.75)', marginBottom: 12 }}>{usuario.email}</div>
          <span className="perf-rol-chip">{rolIcon} {rolLabel}</span>
          {verificado && <span className="perf-rol-chip" style={{ marginLeft: 8 }}>✅ Verificado</span>}
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
                <label className="lbl">Edad</label>
                <input className="inp" type="number" min={16} max={99} value={edad} onChange={(e) => setEdad(e.target.value)} />
              </div>
              <div>
                <label className="lbl">Email institucional</label>
                <input className="inp" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrorEmail(''); }} />
                {errorEmail && <div className="form-error">{errorEmail}</div>}
              </div>
              <div>
                <label className="lbl">Universidad</label>
                <select className="sel" value={universidad} onChange={(e) => { setUniversidad(e.target.value); setErrorEmail(''); }}>
                  {NOMBRES_UNIVERSIDADES.map((u) => <option key={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="lbl">Descripción</label>
                <textarea className="txa" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} maxLength={240} />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-o" onClick={() => setEditando(false)}>Cancelar</button>
                <button
                  className="btn btn-p"
                  disabled={!nombre.trim() || !email.trim() || Number(edad) < 16}
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
            <InfoRow icon="🎂" label="Edad" value={usuario.edad ? `${usuario.edad} años` : '—'} />
            <InfoRow icon="✉️" label="Email" value={usuario.email} />
            <InfoRow icon="🎓" label="Institución" value={usuario.universidad} />
            <InfoRow icon={rolIcon} label="Rol" value={rolLabel} />
            {usuario.descripcion && <InfoRow icon="📝" label="Descripción" value={usuario.descripcion} />}
            <button className="btn btn-o" style={{ marginTop: 10 }} onClick={() => setEditando(true)}>
              Editar perfil
            </button>
          </div>
        )}

        <div className="sec">
          <div className="sec-title">Verificación de identidad {verificado ? '✅' : '— pendiente'}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <DocBox
              label="Carnet — lado frontal"
              preview={usuario.documentos?.carnetFrente}
              onChange={(e) => onDocumento(e, 'carnetFrente')}
            />
            <DocBox
              label="Carnet — lado posterior"
              preview={usuario.documentos?.carnetReverso}
              onChange={(e) => onDocumento(e, 'carnetReverso')}
            />
            <DocBox
              label="Credencial universitaria"
              preview={usuario.documentos?.credencial}
              onChange={(e) => onDocumento(e, 'credencial')}
            />
          </div>
        </div>

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

function DocBox({
  label,
  preview,
  onChange,
}: {
  label: string;
  preview?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="lbl">{label}</label>
      <label className={`upload-box${preview ? ' has-preview' : ''}`}>
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt={label} className="upload-preview" />
        ) : (
          <>
            <span className="upload-ico">🪪</span>
            <span className="upload-txt">Subir foto</span>
          </>
        )}
        <input type="file" accept="image/*" onChange={onChange} style={{ display: 'none' }} />
      </label>
    </div>
  );
}
