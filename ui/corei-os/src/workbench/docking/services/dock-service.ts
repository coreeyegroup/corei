import {

    dockRuntime

} from "../runtime/dock-runtime";

class DockService{

    resizeLeft(

        width:number

    ){

        dockRuntime.resizeLeft(width);

    }

    resizeRight(

        width:number

    ){

        dockRuntime.resizeRight(width);

    }

    resizeBottom(

        height:number

    ){

        dockRuntime.resizeBottom(height);

    }

}

export const dockService=

new DockService();
