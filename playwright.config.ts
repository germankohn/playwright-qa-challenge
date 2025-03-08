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
  reporter: [['list'], ['json', { outputFile: 'playwright-report/test-results.json' }]],
  timeout: 20000, // Tiempo máximo para cada test
  use: {
    headless: true, // Asegurarse de que los tests se ejecuten en modo headless
    slowMo: 1000,    // Add delay between actions
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    trace: 'on-first-retry', // Generar trazas solo en el primer reintento
    video: 'retain-on-failure', // Generar videos solo en caso de fallo
    screenshot: 'only-on-failure', // Generar capturas de pantalla solo en caso de fallo
  },
  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        baseURL: BASE_URL,
        headless: true,
        slomo: 1000,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        
      },
    },
  ],
});