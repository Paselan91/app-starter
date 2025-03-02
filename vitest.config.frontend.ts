import react from "@vitejs/plugin-react";
import { mergeBaseConfig } from "./vitest.config.base";

export default mergeBaseConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		setupFiles: "./vitest.frontend.setup.ts",
		include: ["src/**/*.spec.tsx"],
		coverage: {
			include: ["src/**/*.tsx"],
			exclude: ["node_modules", "dist"],
		},
	},
});
