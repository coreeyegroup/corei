import {
  useDesktopModeStore
}
from "../store/desktop-mode.store";

export function DesktopModeToggle() {

  const {
    mode,
    toggleMode
  } =
    useDesktopModeStore();

  return (

    <button

      className="desktop-mode-toggle"

      onClick={
        toggleMode
      }
    >

      {mode === "view"

        ? "Edit Layout"

        : "Exit Edit"}

    </button>

  );

}