import { viewRegistry }
from "../registry/view.registry";

export function ViewTabs() {

  const views =
    viewRegistry.filter(
      view => view.domain_id === "d01-cluster"
    );

  return (
    <div className="view-tabs">

      {views.map((view) => (

        <div
          key={view.view_id}
          className="view-tab"
        >
          {view.title}
        </div>

      ))}

    </div>
  );
}
