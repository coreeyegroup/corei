import {
  useOperatorStore
}
from "../store/operator-store";

export function OperatorRenderer() {

  const {
    activeToolId
  } =
    useOperatorStore();

  return (

    <div className="operator-content">

      {activeToolId.toUpperCase()}

    </div>

  );
}
