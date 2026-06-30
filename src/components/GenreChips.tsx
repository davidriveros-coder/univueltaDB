export function GenreChips({ genres, max }: { genres: string[]; max?: number }) {
  const list = typeof max === 'number' ? genres.slice(0, max) : genres;
  return (
    <>
      {list.map((g) => (
        <span key={g} className="genre-chip">
          🎵 {g}
        </span>
      ))}
    </>
  );
}
