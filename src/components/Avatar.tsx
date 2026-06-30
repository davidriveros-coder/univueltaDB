interface AvatarProps {
  initials: string;
  avatarClass: string;
  size?: number;
  fontSize?: number;
  style?: React.CSSProperties;
  src?: string;
}

export function Avatar({ initials, avatarClass, size = 40, fontSize = 14, style, src }: AvatarProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={initials}
        className="av"
        style={{ width: size, height: size, objectFit: 'cover', ...style }}
      />
    );
  }
  return (
    <div
      className={`av ${avatarClass}`}
      style={{ width: size, height: size, fontSize, ...style }}
    >
      {initials}
    </div>
  );
}
