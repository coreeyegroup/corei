import React from "react";
import ReactDOM from "react-dom/client";

import { RibbonProvider } from "./cognitive/top-consciousness/providers";
import { InfrastructureRuntimeProvider } from "./experiences/infrastructure/runtime";

import App from "./App";

ReactDOM.createRoot(
    document.getElementById("root")!
).render(

    <React.StrictMode>

        <RibbonProvider>

            <InfrastructureRuntimeProvider>

                <App />

            </InfrastructureRuntimeProvider>

        </RibbonProvider>

    </React.StrictMode>

);
