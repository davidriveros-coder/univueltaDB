import Link from 'next/link';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { GenreChips } from './GenreChips';
import { SOCIABILITY_LEVELS } from '@/lib/mockData';
import { formatCLP } from '@/lib/services/trips';
import type { Trip } from '@/lib/types';

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link href={`/viaje/${trip.id}`} className="tc">
      <div className="tc-top">
        <Avatar initials={trip.driver.initials} avatarClass={trip.driver.avatarClass} size={48} fontSize={15} />
        <div className="tc-info">
          <div className="tc-name">{trip.driver.fullName}</div>
          <div className="tc-meta">
            <Badge badgeClass={trip.driver.badgeClass} icon={trip.driver.badgeIcon} label={trip.driver.verificationType} />
            <span style={{ fontSize: 12, color: 'var(--txt2)', fontWeight: 600 }}>{trip.driver.university}</span>
          </div>
        </div>
      </div>
      <div className="tc-genres">
        <GenreChips genres={trip.genres} max={3} />
      </div>
      <div className="tc-route">
        <strong>{trip.origin}</strong>
        <span style={{ color: 'var(--txt3)' }}>→</span>
        <strong>{trip.destination}</strong>
        <span style={{ color: 'var(--txt3)' }}>·</span>
        <span>{trip.time}</span>
      </div>
      <div className="div" style={{ marginBottom: 11 }} />
      <div className="tc-bot">
        <div className="tc-stats">
          <div className="tc-stat">⭐ {trip.driver.rating}</div>
          <div className="tc-stat">💺 {trip.seatsAvailable}</div>
          <div className="tc-stat">{SOCIABILITY_LEVELS[trip.sociabilityLevel].emoji}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="tc-price">
            {formatCLP(trip.priceCLP)} <span>/persona</span>
          </div>
          <span className="tc-btn">Ver →</span>
        </div>
      </div>
    </Link>
  );
}
