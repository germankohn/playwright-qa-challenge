import { Page, Locator } from "@playwright/test";

export class ResultsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  obtenerTituloViajeDeIda(tituloViajeDeIda: string): Locator {
    return this.page.locator(`div.title:has-text("${tituloViajeDeIda}")`);
  }

  obtenerTituloOrigen(tituloOrigen: string): Locator {
    return this.page.locator(`span.salida:has-text("${tituloOrigen}")`);
  }

  obtenerTituloDestino(tituloDestino: string): Locator {
    return this.page.locator(`span.llegada:has-text("${tituloDestino}")`);
  }

  obtenerTextoDeNoResultados(text: string): Locator {
    return this.page.locator(`text=${text}`);
  }

  advertenciaOrigenIncompleto(advertenciaOrigen:string): Locator {
    return this.page.locator(`li.parsley-required:has-text("${advertenciaOrigen}")`);
  }

  advertenciaDestinoIncompleto(advertenciaDestino:string): Locator {
    return this.page.locator(`li.parsley-required:has-text("${advertenciaDestino}")`);
  }

  advertenciaFechaDeIdaIncompleta(advertenciaFechaDeIda:string): Locator {
    return this.page.locator(`li.parsley-required:has-text("${advertenciaFechaDeIda}")`);
  }

}