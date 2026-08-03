export function EmptyWorkspace(): React.JSX.Element {

    return (

        <div
            className="
                flex
                h-full
                w-full
                items-center
                justify-center
                bg-neutral-950
            "
        >

            <div
                className="
                    flex
                    flex-col
                    items-center
                    gap-4
                "
            >

                <h1
                    className="
                        text-3xl
                        font-semibold
                        tracking-wide
                        text-neutral-100
                    "
                >
                    COREI Operating Environment
                </h1>

                <p
                    className="
                        max-w-xl
                        text-center
                        text-neutral-400
                    "
                >
                    Workspace Platform initialized.
                    Awaiting workspace composition.
                </p>

            </div>

        </div>

    );

}
