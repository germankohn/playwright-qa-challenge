import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ResultsPage } from '../../pages/ResultsPage';
import { DateUtils } from '../../utils/DateUtils';

let context: BrowserContext;
let page: Page;
let homePage: HomePage;
let resultsPage: ResultsPage;

test.beforeEach(async ({ browser, baseURL }: { browser: Browser, baseURL?: string }) => {
  context = await browser.newContext();
  page = await context.newPage();
  homePage = new HomePage(page);
  resultsPage = new ResultsPage(page);
  await test.step('Abrir la pagina de inicio', async () => {
    await homePage.openHomePage(baseURL!);
  });
});

test.afterEach(async () => {
  await context.close();
});

test('Busqueda rapida de pasajes de micro', async () => {
  await homePage.completarFormularioYBuscar('(LNS) Liniers Terminal (Capital Federal) (Argentina)', '(TAN) Tandil Terminal (Buenos Aires) (Argentina)', 'Ida y vuelta', DateUtils.proximoDia, 2, DateUtils.proximaSemana);

  await test.step('Verificar resultados de búsqueda son visibles y correctos.', async () => {
    // Esperar a que la página se cargue completamente
    await page.waitForLoadState('networkidle');

    // Capturar pantalla antes de la verificación
    await page.screenshot({ path: 'screenshots/before-check.png' });

    // Verificar que el título del viaje de ida sea visible
    //await expect(page.locator('div.title:has-text("Seleccioná tu viaje de IDA")')).toBeVisible();

    // Verificar que el título de origen sea visible
    await expect(resultsPage.obtenerTituloOrigen("Liniers Terminal")).toBeVisible();

    // Verificar que el título de destino sea visible
    await expect(resultsPage.obtenerTituloDestino("Tandil Terminal")).toBeVisible();

    // Capturar pantalla después de la verificación
    await page.screenshot({ path: 'screenshots/after-check.png' });
  });
});

test('Busqueda sin resultados', async () => {
  await homePage.completarFormularioYBuscar('(LNS) Liniers Terminal (Capital Federal) (Argentina)', '(TAN) Tandil Terminal (Buenos Aires) (Argentina)', 'Solo ida', DateUtils.proximoAnio, 2);

  await test.step('Verificar resultados de búsqueda son visibles y correctos.', async () => {
    await expect(resultsPage.obtenerTextoDeNoResultados("No encontramos opciones para tu viaje")).toBeVisible();
  });
});

test('Busqueda con parametros erroneos o faltantes', async () => {
  await homePage.realizarBusqueda();

  await test.step('Verificar advertencias de parámetros de búsquedas incompletos.', async () => {
    await expect(resultsPage.advertenciaOrigenIncompleto("Completá el Origen de tu viaje")).toBeVisible();
    await expect(resultsPage.advertenciaDestinoIncompleto("Completá el Destino de tu viaje")).toBeVisible();
    await expect(resultsPage.advertenciaFechaDeIdaIncompleta("Completá la fecha")).toBeVisible();
  });
});