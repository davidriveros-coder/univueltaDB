interface BadgeProps {
  badgeClass: string;
  icon: string;
  label: string;
  style?: React.CSSProperties;
}

export function Badge({ badgeClass, icon, label, style }: BadgeProps) {
  return (
    <span className={`badge ${badgeClass}`} style={style}>
      {icon} {label}
    </span>
  );
}
