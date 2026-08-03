import {
  clusterDesktopWindows
}
from "../registry/cluster-desktop.registry";

import {
  DesktopTile
}
from "./DesktopTile";

import {
  useDesktopLayoutStore
}
from "../store/desktop-layout.store";

export function ClusterDesktop() {

  const {
    layout
  } =
    useDesktopLayoutStore();

  return (

    <div className="cluster-desktop-grid">

      {layout.items.map(
        layoutItem => {

          const tile =
            clusterDesktopWindows.find(
              item =>
                item.window_id ===
                layoutItem.window_id
            );

          if (!tile) {
            return null;
          }

          return (

            <DesktopTile
              key={
                tile.window_id
              }
              tile={tile}
            />

          );

        }
      )}

    </div>

  );

}
