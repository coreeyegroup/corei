import {
  useDesktopStore
}
from "../store/desktop-store";

import {
  ClusterDesktop
}
from "../components/ClusterDesktop";

export function DesktopRenderer() {

  const {
    activeDesktopId
  } =
    useDesktopStore();

  switch (
    activeDesktopId
  ) {

    case "d01-cluster":

      return (
        <ClusterDesktop />
      );

    default:

      return (
        <ClusterDesktop />
      );
  }
}
