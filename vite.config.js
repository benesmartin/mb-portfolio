import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   host: true, // ← force loopback interface
  //   hmr: {
  //     protocol: "ws",
  //     host: "192.168.1.5",
  //     port: 5173,
  //   },
  // },
});
