import { TopRegion } from "../regions/TopRegion";
import { LeftRegion } from "../regions/LeftRegion";
import { CenterRegion } from "../regions/CenterRegion";
import { RightRegion } from "../regions/RightRegion";
import { BottomRegion } from "../regions/BottomRegion";
import { StatusRegion } from "../regions/StatusRegion";

export function ShellLayout(): React.JSX.Element {

    return (

        <div className="h-screen w-screen overflow-hidden bg-zinc-950">

            <TopRegion />

            <div className="flex h-[calc(100%-48px-24px)]">

                <LeftRegion />

                <div className="flex flex-1 flex-col">

                    <CenterRegion />

                    <BottomRegion />

                </div>

                <RightRegion />

            </div>

            <StatusRegion />

        </div>

    );

}
