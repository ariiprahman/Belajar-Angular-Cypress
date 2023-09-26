import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.js",
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    video: true,
  },
});
