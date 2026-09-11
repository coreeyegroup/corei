import { useEffect, useRef } from "react";

import { Terminal as XTerminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";

import "@xterm/xterm/css/xterm.css";

import type { TerminalContract } from "../contracts/terminal-contract";

export function Terminal(props: TerminalContract) {

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (!containerRef.current) {
            return;
        }

        const terminal = new XTerminal({

            cursorBlink: props.cursorBlink ?? true,

            fontSize: props.fontSize ?? 13,

            disableStdin: props.readonly ?? false

        });

        const fitAddon = new FitAddon();

        terminal.loadAddon(fitAddon);

        terminal.loadAddon(new WebLinksAddon());

        terminal.open(containerRef.current);

        fitAddon.fit();

        terminal.writeln("COREI Institutional Operating System");
        terminal.writeln("Terminal Foundation Initialized.");

        return () => {

            terminal.dispose();

        };

    }, [props]);

    return (

        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%"
            }}
        />

    );

}
