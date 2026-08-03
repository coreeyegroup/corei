import {
  useOperatorStore
}
from "../store/operator-store";

import {
  OperatorTabs
}
from "./OperatorTabs";

import {
  OperatorRenderer
}
from "./OperatorRenderer";

export function OperatorArea() {

  const {
    height
  } =
    useOperatorStore();

  return (

    <section
      className="operator-area"
      style={{
        height:
          `${height}px`
      }}
    >

      <OperatorTabs />

      <OperatorRenderer />

    </section>

  );
}
