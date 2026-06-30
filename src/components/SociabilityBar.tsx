import { SOCIABILITY_LEVELS } from '@/lib/mockData';

export function SociabilityBar({ level }: { level: number }) {
  const s = SOCIABILITY_LEVELS[level];
  const dots = [1, 2, 3, 4, 5];
  return (
    <div className="soc-wrap">
      <div className="soc-bar">
        <span style={{ fontSize: 16 }}>🎧</span>
        <div className="soc-track">
          {dots.map((i) => (
            <div key={i} className={`soc-step ${i <= level ? 'on' : ''}`} />
          ))}
        </div>
        <span style={{ fontSize: 16 }}>🎉</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
        <span style={{ fontSize: 15 }}>{s.emoji}</span>
        <div>
          <div className="soc-label">{s.label}</div>
          <div className="soc-desc">{s.desc}</div>
        </div>
      </div>
    </div>
  );
}
