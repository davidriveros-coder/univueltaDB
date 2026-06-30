interface AvatarProps {
  initials: string;
  avatarClass: string;
  size?: number;
  fontSize?: number;
  style?: React.CSSProperties;
}

export function Avatar({ initials, avatarClass, size = 40, fontSize = 14, style }: AvatarProps) {
  return (
    <div
      className={`av ${avatarClass}`}
      style={{ width: size, height: size, fontSize, ...style }}
    >
      {initials}
    </div>
  );
}
