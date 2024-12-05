import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: false,
    environment: "node",
    include: ["src/features/**/*.test.{js,ts}"],
    setupFiles: ["src/tests/setupTests.js"],
    reporters: ["verbose"],
    restoreMocks: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@features": path.resolve(__dirname, "./features"),
    },
  },
});
