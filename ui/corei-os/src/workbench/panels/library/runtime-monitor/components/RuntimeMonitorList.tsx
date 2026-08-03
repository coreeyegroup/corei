import type {
    RuntimeMonitorItem
} from "../services/runtime-monitor-adapter";

import {
    RuntimeStatusBadge
} from "./RuntimeStatusBadge";

interface RuntimeMonitorListProps {

    readonly items:
        readonly RuntimeMonitorItem[];

    readonly selected?:
        RuntimeMonitorItem;

    readonly onSelect: (
        item: RuntimeMonitorItem
    ) => void;

}

export function RuntimeMonitorList({

    items,
    selected,
    onSelect

}: RuntimeMonitorListProps) {

    return (

        <div
            className="
                flex
                flex-col
                overflow-auto
            "
        >

            {

                items.map(

                    item => (

                        <button
                            key={item.capabilityId}
                            type="button"
                            onClick={() => onSelect(item)}
                            className={`
                                w-full
                                border-b
                                px-3
                                py-2
                                text-left
                                hover:bg-accent
                                ${
                                    selected?.capabilityId === item.capabilityId
                                        ? "bg-accent"
                                        : ""
                                }
                            `}
                        >

                            <div className="font-medium">

                                {item.capabilityId}

                            </div>

                            <div
                                className="
                                    mt-2
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <RuntimeStatusBadge
                                    status={item.status}
                                />

                                {

                                    item.providerId && (

                                        <span
                                            className="
                                                text-xs
                                                text-muted-foreground
                                            "
                                        >

                                            {item.providerId}

                                        </span>

                                    )

                                }

                            </div>

                        </button>

                    )

                )

            }

        </div>

    );

}
