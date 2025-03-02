import path from "node:path";
import { type ViteUserConfig, defineConfig, mergeConfig } from "vitest/config";

export const baseConfig = defineConfig({
	test: {
		passWithNoTests: true,
		globals: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "lcov"],
			exclude: ["node_modules", "dist"],
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});

export const mergeBaseConfig = (config: ViteUserConfig) =>
	mergeConfig(baseConfig, defineConfig(config));
