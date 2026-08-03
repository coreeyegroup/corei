import {
  useLauncher
}
from "../store/launcher-store";

export function AddWorkspaceButton() {

  const {
    toggle
  } = useLauncher();

  return (

    <div
      className="workspace-tab-add"
      onClick={toggle}
    >
      +
    </div>

  );
}
