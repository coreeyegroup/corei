import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({

    plugins: [

        react(),

        tailwindcss()

    ],

    server: {

        host: "0.0.0.0",

        port: 5174,

        strictPort: true

    },

    resolve: {

        alias: {

            "@": path.resolve(__dirname, "./src"),

            "@foundation": path.resolve(__dirname, "./src/foundation"),

            "@platform": path.resolve(__dirname, "./src/platform"),

            "@shell": path.resolve(__dirname, "./src/shell"),

            "@navigation": path.resolve(__dirname, "./src/navigation"),

            "@workspace": path.resolve(__dirname, "./src/workspace"),

            "@runtime": path.resolve(__dirname, "./src/runtime"),

            "@extensions": path.resolve(__dirname, "./src/extensions")

        }

    }

});