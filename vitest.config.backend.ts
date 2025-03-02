import { mergeBaseConfig } from "./vitest.config.base";

export default mergeBaseConfig({
	test: {
		include: ["src/app/api/**/*.spec.ts"],
		coverage: {
			include: ["src/app/api/**/*.ts"],
		},
	},
});
