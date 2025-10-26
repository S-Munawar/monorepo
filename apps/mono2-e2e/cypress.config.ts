import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      "cypressDir": "src",
      "bundler": "vite",
      "webServerCommands": {
        "default": "pnpm exec nx run mono2:dev",
        "production": "pnpm exec nx run mono2:preview"
      },
      "ciWebServerCommand": "pnpm exec nx run mono2:preview",
      "ciBaseUrl": "http://localhost:4201"
    }),
    baseUrl: 'http://localhost:4201'
  }
});
