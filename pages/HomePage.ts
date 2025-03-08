import { Page, Locator } from "@playwright/test";

export class HomePage {
  private page: Page;
  private origenDesplegable: Locator;
  private origenInput: Locator;
  private destinoInput: Locator;
  private soloIdaRadioButton: Locator;
  private idaYVueltaRadioButton: Locator;
  private fechaDeIdaInput: Locator;
  private fechaDeVueltaInput: Locator;
  private cantidadDePasajerosSelect: Locator;
  private buscarButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.origenDesplegable = page.locator('#select2-PadOrigen-container');
    this.origenInput = page.locator('input.select2-search__field[placeholder="Ingresá desde dónde viajás"]');
    this.destinoInput = page.locator('input.select2-search__field[placeholder="Ingresá hacia dónde viajás"]');
    this.soloIdaRadioButton = page.locator('input#rbIda');
    this.idaYVueltaRadioButton = page.locator('input#rbIdaVuelta');
    this.fechaDeIdaInput = page.locator('input#fechaPartida');
    this.fechaDeVueltaInput = page.locator('input#fechaVuelta');
    this.cantidadDePasajerosSelect = page.locator('select#pasajeros');
    this.buscarButton = page.locator('input#btnCons');
  }

  async openHomePage(baseURL: string): Promise<void> {
    await this.page.goto(baseURL);
  }

  async completarFormularioDeReserva(origen: string, destino: string, tipoDeViaje: string,
    fechaDeIda: Date, cantidadDePasajeros: number,  fechaDeVuelta?: Date): Promise<void> {
        await this.seleccionarOrigen(origen);
        await this.seleccionarDestino(destino);
        await this.seleccionarTipoDeViaje(tipoDeViaje);
        await this.seleccionarFechaDeIda(fechaDeIda);
        await this.seleccionarCantidadDePasajeros(cantidadDePasajeros);
        if (tipoDeViaje === 'Ida y vuelta') {
            await this.seleccionarFechaDeVuelta(fechaDeVuelta!);
        }
  }

  async seleccionarOrigen(origen: string): Promise<void> {
    await this.origenDesplegable.click();
    await this.origenInput.fill(origen);
    const origenOption = this.page.locator(`li.select2-results__option:has-text("${origen}")`);
    await origenOption.click();
  }

  async seleccionarDestino(destino: string): Promise<void> {
    await this.destinoInput.fill(destino);
    const destinoOption = this.page.locator(`li.select2-results__option:has-text("${destino}")`);
    await destinoOption.click();
  }

  async seleccionarTipoDeViaje(tipoDeViaje: string): Promise<void> {
    if (tipoDeViaje === 'Sólo ida') {
      const isChecked = await this.soloIdaRadioButton.isChecked();
      if (!isChecked) {
        await this.soloIdaRadioButton.click({ force: true });
      }
    } else if (tipoDeViaje === 'Ida y vuelta') {
      const isChecked = await this.idaYVueltaRadioButton.isChecked();
      if (!isChecked) {
        await this.idaYVueltaRadioButton.click({ force: true });
      }
    }
  }
  
  async seleccionarFechaDeIda(fechaDeIda: Date): Promise<void> {
    await this.fechaDeIdaInput.fill(fechaDeIda.toLocaleDateString());
  }

  async seleccionarFechaDeVuelta(fechaDeVuelta: Date): Promise<void> {
    await this.fechaDeVueltaInput.fill(fechaDeVuelta.toLocaleDateString());
  }

  async seleccionarCantidadDePasajeros(cantidadDePasajeros: number): Promise<void> {
    await this.cantidadDePasajerosSelect.selectOption({ label: cantidadDePasajeros.toString() });
  }

  async realizarBusqueda(): Promise<void> {
    await this.buscarButton.click();
  }

  async completarFormularioYBuscar(origen: string, destino: string, tipoDeViaje: string, fechaDeIda: Date, cantidadDePasajeros: number, fechaDeVuelta?: Date): Promise<void> {
    await this.completarFormularioDeReserva(origen, destino, tipoDeViaje, fechaDeIda, cantidadDePasajeros, fechaDeVuelta);
    await this.realizarBusqueda();
  }
}