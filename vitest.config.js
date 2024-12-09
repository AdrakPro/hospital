import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: false,
    environment: "node",
    include: ["src/features/**/*.test.{js,ts}"],
    setupFiles: ["src/config/setupTests.js"],
    reporters: ["verbose"],
    coverage: {
      reporter: ["text", "lcov"],
    },
    restoreMocks: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@person": path.resolve(__dirname, "./src/features/person"),
      "@patient": path.resolve(__dirname, "./src/features/patient"),
      "@db": path.resolve(__dirname, "./src/db"),
      "@common": path.resolve(__dirname, "./src/features/common"),
    },
  },
});
