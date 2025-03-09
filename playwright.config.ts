import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Determine the environment (QA o PROD)
const ENV = process.env.ENV?.toUpperCase();

if (!ENV) {
  throw new Error('ENV variable is missing in .env file. Set ENV=QA or ENV=PROD.');
}

// Map environment to the correct URLs
const BASE_URL = ENV === 'QA' ? process.env.QA_URL : ENV === 'PROD' ? process.env.PROD_URL : undefined;

if (!BASE_URL) {
  throw new Error(`Missing URL for ${ENV} environment. Check your .env file.`);
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['json', { outputFile: 'playwright-report/test-results.json' }], ['html', { outputFolder: 'playwright-report/html', open: 'never' }]],
  timeout: 20000, // Tiempo máximo para cada test
  use: {
    headless: true, // Asegurarse de que los tests se ejecuten en modo headless
    trace: 'on', // Generar trazas para todos los tests
    video: 'on', // Generar videos para todos los tests
    screenshot: 'only-on-failure', // Generar capturas de pantalla solo en caso de fallo
  },
  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        baseURL: BASE_URL,
      },
    },
  ],
});