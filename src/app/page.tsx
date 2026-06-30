import Link from 'next/link';
import { Avatar } from '@/components/Avatar';
import { formatCLP } from '@/lib/services/trips';

const PREVIEW = {
  driver: { initials: 'CM', avatarClass: 'av-blue', university: 'UDP', careerOrRole: '3er año Diseño', rating: 4.9 },
  origin: 'Santiago', destination: 'Valparaíso', priceCLP: 4500,
  genres: ['Indie', 'Rock Alternativo'],
};

export default function HomePage() {
  const preview = PREVIEW;

  return (
    <div className="screen" id="s-home">
      <div className="sb">
        <span>9:41</span>
        <div className="sb-ic">
          <span>●●●</span>
          <span>WiFi</span>
          <span>🔋</span>
        </div>
      </div>
      <div className="home-body">
        <div className="logo-row">
          <div className="logo-ic">🚗</div>
          <span className="logo-nm">UniVuelta</span>
        </div>
        <div className="home-h1">
          La red confiable
          <br />
          para volver
          <br />a casa.
        </div>
        <div className="home-sub">
          Viajes compartidos entre Santiago y regiones, solo para comunidad universitaria.
        </div>
        <div className="preview-card">
          <div className="preview-top">
            <Avatar initials={preview.driver.initials} avatarClass={preview.driver.avatarClass} size={38} fontSize={13} />
            <div className="preview-route">
              {preview.origin} → {preview.destination}
            </div>
            <div className="preview-price">{formatCLP(preview.priceCLP)}</div>
          </div>
          <div className="preview-pills">
            <div className="preview-pill">
              🎓 {preview.driver.university} · {preview.driver.careerOrRole}
            </div>
            <div className="preview-pill">🎵 {preview.genres.slice(0, 2).join(' · ')}</div>
            <div className="preview-pill">⭐ {preview.driver.rating}</div>
          </div>
        </div>
        <div className="trust-row">
          <div className="trust-chip">🎓 Comunidad universitaria</div>
          <div className="trust-chip">✅ Conductores validados</div>
          <div className="trust-chip">💸 Precio justo</div>
        </div>
      </div>
      <div className="home-cta">
        <Link href="/buscar" className="btn btn-w" style={{ textAlign: 'center' }}>
          Buscar viaje →
        </Link>
        <Link href="/publicar" className="btn btn-gh" style={{ textAlign: 'center' }}>
          Publicar un viaje
        </Link>
      </div>
      <div className="safe" />
    </div>
  );
}
