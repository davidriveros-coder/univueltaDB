'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveUsuario, usuarioParaSheets, type UserRole, type Usuario } from '@/lib/client/auth';
import { fileToCompressedDataUrl } from '@/lib/client/imageUtils';
import { NOMBRES_UNIVERSIDADES, esCorreoInstitucionalValido } from '@/lib/universidades';

type Modo = 'crear' | 'login';

export default function RegistroPage() {
  const router = useRouter();
  const [modo, setModo] = useState<Modo>('crear');

  // ── Crear cuenta ──────────────────────────────────────────────────────────
  const [paso, setPaso] = useState<1 | 2>(1);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [universidad, setUniversidad] = useState(NOMBRES_UNIVERSIDADES[0]);
  const [rol, setRol] = useState<UserRole>('pasajero');
  const [descripcion, setDescripcion] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [carnetFrente, setCarnetFrente] = useState('');
  const [carnetReverso, setCarnetReverso] = useState('');
  const [credencial, setCredencial] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [subiendo, setSubiendo] = useState(false);

  // ── Iniciar sesión ────────────────────────────────────────────────────────
  const [loginEmail, setLoginEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginCargando, setLoginCargando] = useState(false);

  const correoValido = email.trim() === '' || esCorreoInstitucionalValido(email.trim(), universidad);
  const paso1Valido = nombre.trim() !== '' && Number(edad) >= 16 && email.trim() !== '' && correoValido;

  function irAPaso2() {
    if (!paso1Valido) {
      if (email.trim() && !correoValido) setErrorEmail('Usa tu correo institucional de la universidad seleccionada.');
      return;
    }
    setErrorEmail('');
    setPaso(2);
  }

  async function onArchivo(e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSubiendo(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file, 900, 0.7);
      setter(dataUrl);
    } catch {
      // si falla la compresión simplemente no se guarda la imagen
    } finally {
      setSubiendo(false);
    }
  }

  function crearCuenta() {
    if (!paso1Valido) return;
    const usuario: Usuario = {
      id: `u-${Date.now()}`,
      nombre: nombre.trim(),
      edad: Number(edad),
      email: email.trim().toLowerCase(),
      universidad,
      rol,
      descripcion: descripcion.trim(),
      fotoPerfil: fotoPerfil || undefined,
      documentos: {
        carnetFrente: carnetFrente || undefined,
        carnetReverso: carnetReverso || undefined,
        credencial: credencial || undefined,
      },
      creadoEn: new Date().toISOString(),
    };
    saveUsuario(usuario);
    fetch('/api/sheets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sheet: 'usuarios', action: 'create', data: usuarioParaSheets(usuario) }),
    }).catch(() => {});
    router.replace('/');
  }

  async function buscarCuenta() {
    if (!loginEmail.trim()) return;
    setLoginCargando(true);
    setLoginError('');
    try {
      const qs = new URLSearchParams({ sheet: 'usuarios', action: 'list' }).toString();
      const res = await fetch(`/api/sheets?${qs}`, { cache: 'no-store' });
      const rows: Record<string, unknown>[] = await res.json();
      const target = loginEmail.trim().toLowerCase();
      const row = rows.find((r) => String(r.email ?? '').toLowerCase() === target);
      if (!row) {
        setLoginError('No encontramos una cuenta con ese correo. Crea una cuenta primero.');
        return;
      }
      const usuario: Usuario = {
        id: String(row.id),
        nombre: String(row.nombre ?? ''),
        edad: Number(row.edad) || 0,
        email: String(row.email ?? ''),
        universidad: String(row.universidad ?? ''),
        rol: (row.rol as UserRole) === 'conductor' ? 'conductor' : 'pasajero',
        descripcion: String(row.descripcion ?? ''),
        creadoEn: String(row.creadoEn ?? new Date().toISOString()),
      };
      saveUsuario(usuario);
      router.replace('/');
    } catch {
      setLoginError('No pudimos conectar con el servidor. Intenta de nuevo.');
    } finally {
      setLoginCargando(false);
    }
  }

  return (
    <div className="screen" id="s-registro">
      <div className="reg-hero">
        <div className="logo-row" style={{ justifyContent: 'center', marginBottom: 10 }}>
          <div className="logo-ic">🚗</div>
          <span className="logo-nm" style={{ color: '#fff' }}>UniVuelta</span>
        </div>
        <div className="reg-title">{modo === 'crear' ? 'Crea tu cuenta' : 'Inicia sesión'}</div>
        <div className="reg-sub">Viajes seguros dentro de la comunidad universitaria</div>
      </div>

      <div className="auth-tabs">
        <button
          type="button"
          className={`auth-tab${modo === 'crear' ? ' active' : ''}`}
          onClick={() => setModo('crear')}
        >
          Crear cuenta
        </button>
        <button
          type="button"
          className={`auth-tab${modo === 'login' ? ' active' : ''}`}
          onClick={() => setModo('login')}
        >
          Iniciar sesión
        </button>
      </div>

      {modo === 'login' ? (
        <div className="reg-body">
          <div>
            <label className="lbl">Correo institucional</label>
            <input
              className="inp"
              type="email"
              placeholder="tu@mail.udp.cl"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          {loginError && <div className="form-error">{loginError}</div>}
          <button className="btn btn-p" disabled={!loginEmail.trim() || loginCargando} onClick={buscarCuenta}>
            {loginCargando ? 'Buscando…' : 'Iniciar sesión →'}
          </button>
          <div style={{ fontSize: 12, color: 'var(--txt3)', textAlign: 'center', lineHeight: 1.6 }}>
            Las fotos de perfil y documentos quedan guardadas en el dispositivo donde creaste la cuenta.
          </div>
        </div>
      ) : (
        <div className="reg-body">
          <div className="step-row">
            <div className={`step-dot${paso >= 1 ? ' active' : ''}`}>1</div>
            <div className="step-line" />
            <div className={`step-dot${paso >= 2 ? ' active' : ''}`}>2</div>
          </div>

          {paso === 1 ? (
            <>
              <div>
                <label className="lbl">Nombre completo</label>
                <input className="inp" placeholder="Ej: María González" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>
              <div>
                <label className="lbl">Edad</label>
                <input className="inp" type="number" min={16} max={99} placeholder="Ej: 21" value={edad} onChange={(e) => setEdad(e.target.value)} />
              </div>
              <div>
                <label className="lbl">Universidad o institución</label>
                <select className="sel" value={universidad} onChange={(e) => { setUniversidad(e.target.value); setErrorEmail(''); }}>
                  {NOMBRES_UNIVERSIDADES.map((u) => <option key={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="lbl">Correo institucional</label>
                <input
                  className="inp"
                  type="email"
                  placeholder="tu@mail.udp.cl"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrorEmail(''); }}
                />
                {errorEmail && <div className="form-error">{errorEmail}</div>}
              </div>
              <div>
                <label className="lbl">¿Cómo usarás UniVuelta?</label>
                <div className="rol-row">
                  <button type="button" className={`rol-btn${rol === 'pasajero' ? ' active' : ''}`} onClick={() => setRol('pasajero')}>
                    <span style={{ fontSize: 24 }}>🎒</span>
                    <span style={{ fontWeight: 700 }}>Pasajero</span>
                    <span style={{ fontSize: 12, opacity: 0.75 }}>Busco viajes</span>
                  </button>
                  <button type="button" className={`rol-btn${rol === 'conductor' ? ' active' : ''}`} onClick={() => setRol('conductor')}>
                    <span style={{ fontSize: 24 }}>🚗</span>
                    <span style={{ fontWeight: 700 }}>Conductor</span>
                    <span style={{ fontSize: 12, opacity: 0.75 }}>Ofrezco viajes</span>
                  </button>
                </div>
              </div>
              <div>
                <label className="lbl">Foto de perfil (opcional)</label>
                <UploadBox preview={fotoPerfil} onChange={(e) => onArchivo(e, setFotoPerfil)} icono="🙂" texto="Subir foto de perfil" circular />
              </div>
              <div>
                <label className="lbl">Cuéntanos sobre ti (opcional)</label>
                <textarea
                  className="txa"
                  placeholder="Ej: Estudiante de ingeniería, me gusta la música y viajar con buena onda."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  maxLength={240}
                />
              </div>
              <button className="btn btn-p" disabled={!paso1Valido} onClick={irAPaso2}>
                Continuar →
              </button>
            </>
          ) : (
            <>
              <div className="verif-intro">
                <span style={{ fontSize: 20 }}>🛡️</span>
                <div>
                  <h4>Verificación de identidad</h4>
                  <p>Sube fotos de tu carnet de identidad (adelante y atrás) y tu credencial universitaria. Puedes completarlo más tarde desde tu perfil.</p>
                </div>
              </div>
              <div>
                <label className="lbl">Carnet — lado frontal</label>
                <UploadBox preview={carnetFrente} onChange={(e) => onArchivo(e, setCarnetFrente)} icono="🪪" texto="Subir frente del carnet" />
              </div>
              <div>
                <label className="lbl">Carnet — lado posterior</label>
                <UploadBox preview={carnetReverso} onChange={(e) => onArchivo(e, setCarnetReverso)} icono="🪪" texto="Subir reverso del carnet" />
              </div>
              <div>
                <label className="lbl">Credencial universitaria</label>
                <UploadBox preview={credencial} onChange={(e) => onArchivo(e, setCredencial)} icono="🎓" texto="Subir credencial verificadora" />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-o" onClick={() => setPaso(1)}>← Atrás</button>
                <button className="btn btn-p" disabled={subiendo} onClick={crearCuenta}>
                  {subiendo ? 'Procesando…' : 'Finalizar registro →'}
                </button>
              </div>
            </>
          )}

          <div style={{ fontSize: 12, color: 'var(--txt3)', textAlign: 'center', lineHeight: 1.6 }}>
            Al crear una cuenta aceptas los términos de uso.<br />
            Tu información solo es visible para conductores de tus reservas.
          </div>
        </div>
      )}
      <div className="safe" />
    </div>
  );
}

function UploadBox({
  preview,
  onChange,
  icono,
  texto,
  circular,
}: {
  preview: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icono: string;
  texto: string;
  circular?: boolean;
}) {
  return (
    <label className={`upload-box${preview ? ' has-preview' : ''}${circular ? ' circular' : ''}`}>
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt={texto} className="upload-preview" />
      ) : (
        <>
          <span className="upload-ico">{icono}</span>
          <span className="upload-txt">{texto}</span>
        </>
      )}
      <input type="file" accept="image/*" onChange={onChange} style={{ display: 'none' }} />
    </label>
  );
}
