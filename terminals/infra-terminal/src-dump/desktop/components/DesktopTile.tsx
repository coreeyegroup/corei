import type {
  DesktopWindowContract
}
from "../contracts/desktop-window.contract";

import {
  useWindowStore
}
from "../../workspace/store/window-store";

import {
  useDesktopLayoutStore
}
from "../store/desktop-layout.store";


interface Props {

  tile:
    DesktopWindowContract;

}


export function DesktopTile(
  {
    tile
  }: Props
) {


  const {
    openWindow
  } =
    useWindowStore();

  const {
    layout
  } =
    useDesktopLayoutStore();

  const position =
    layout.items.find(
      item =>
        item.window_id ===
        tile.window_id
    );


  return (

      <div

        className="desktop-tile"

        onDoubleClick={() =>

          openWindow(
            tile.template_id,
            tile.title,
            tile.view_id
          )

        }

        style={{

          gridColumn:
            `${(position?.grid_x ?? 0) + 1}
            / span
            ${position?.grid_w ?? 4}`,

          gridRow:
             `${(position?.grid_y ?? 0) + 1}
            / span
            ${position?.grid_h ?? 3}`

        }}
      >

      <div className="desktop-tile-header">


        <span>

          {tile.icon}

        </span>


        <span>

          {tile.title}

        </span>


      </div>


      <div className="desktop-tile-body">


        {tile.description}


      </div>


    </div>

  );

}
