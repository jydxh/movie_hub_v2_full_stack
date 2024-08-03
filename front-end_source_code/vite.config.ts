import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/api/v1": {
				target: "http://localhost:5000/api/v1",
				changeOrigin: true,
				secure: false,
				rewrite: path => path.replace(/^\/api/, ""),
				cookieDomainRewrite: "localhost", // Ensures cookies are set for localhost
			},
		},
	},
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
