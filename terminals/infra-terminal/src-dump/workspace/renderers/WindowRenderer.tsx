import type {
  WindowContract
}
from "../contracts/window.contract";


import {
  WorkspaceRenderer
}
from "./WorkspaceRenderer";


interface Props {

  window:
    WindowContract;

}


export function WindowRenderer(
  {
    window
  }: Props
) {


  return (

    <div
      className={
        window.window_type === "desktop"
          ? "workspace-window desktop-parent-window"
          : "workspace-window child-workspace-window"
      }
    >


      <div className="workspace-window-header">


        <div className="workspace-window-title">


          {window.title}


        </div>


        <div className="workspace-window-meta">


          {window.domain_id}

          {" / "}

          {window.window_type}

          {" / "}

          {window.mode}


        </div>


      </div>


      <div className="workspace-window-body">


        <WorkspaceRenderer

          viewId={
            window.view_id
          }

        />


      </div>


    </div>

  );

}
