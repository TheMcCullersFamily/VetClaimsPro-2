import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  // IMPORTANT: This tells Vite that the app is hosted
  // at https://themccullersfamily.github.io/VetClaimsPro-2/
  base: "/VetClaimsPro-2/",

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
