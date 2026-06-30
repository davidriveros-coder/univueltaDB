export function LoadingScreen({ text = 'Cargando…' }: { text?: string }) {
  return (
    <div className="screen" id="s-loading">
      <div className="loading-wrap">
        <div className="loading-road">
          <span className="loading-car">🚗</span>
        </div>
        <div className="loading-txt">{text}</div>
      </div>
    </div>
  );
}
