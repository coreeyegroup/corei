export function ContextArea() {
  return (
    <aside className="context-area">

      <div className="panel-title">
        Runtime Context
      </div>

      <div className="context-list">

        <div className="context-row">
          <span>Environment</span>
          <span>PRODUCTION</span>
        </div>

        <div className="context-row">
          <span>Replay</span>
          <span>LIVE</span>
        </div>

        <div className="context-row">
          <span>Region</span>
          <span>GLOBAL</span>
        </div>

        <div className="context-row">
          <span>Classification</span>
          <span>CONFIDENTIAL</span>
        </div>

      </div>

    </aside>
  );
}
