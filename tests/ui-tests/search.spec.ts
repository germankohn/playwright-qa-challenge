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
    await expect(resultsPage.obtenerTituloViajeDeIda("Seleccioná tu viaje de IDA")).toBeVisible();
    await expect(resultsPage.obtenerTituloOrigen("Liniers Terminal")).toBeVisible();
    await expect(resultsPage.obtenerTituloDestino("Tandil Terminal")).toBeVisible();
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