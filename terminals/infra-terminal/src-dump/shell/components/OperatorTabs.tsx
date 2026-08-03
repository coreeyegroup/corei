import {
  operatorToolCatalog
}
from "../catalog/operator-tool.catalog";

import {
  useOperatorStore
}
from "../store/operator-store";

export function OperatorTabs() {

  const {
    activeToolId,
    setActiveToolId
  } =
    useOperatorStore();

  return (

    <div className="operator-tabs">

      {operatorToolCatalog.map(
        tool => (

          <div
            key={tool.tool_id}
            className={
              activeToolId ===
              tool.tool_id
                ? "operator-tab active"
                : "operator-tab"
            }
            onClick={() =>
              setActiveToolId(
                tool.tool_id
              )
            }
          >

            {tool.title}

          </div>

        )
      )}

    </div>

  );
}
