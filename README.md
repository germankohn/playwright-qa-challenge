# Playwright QA Challenge

## Clonar el Repositorio y Configuración inicial del Proyecto
Clonar repositorio y desde una terminal pararse sobre la raiz del proyecto y ejecutar el siguiente comando:
```
npm install
```
Esperar a que se descarguen todas las dependencias.

Crear en la raiz del proyecto un archivo .env con el siguiente formato. (solicitar los valores al autor).
```
QA_URL=
PROD_URL=
ENV=
```

Se recomienda trabajar con el proyecto desde un IDE como Visual Studio Code o similares.

En caso de utilizar VSCode se recomienda instalar el plug-in de extención llamada:[Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) de mucha utilidad para poder ejecutar los test con un solo clic.    

### Ejecutar los test por consola
Ejecutar todos los test:
Desde la raiz del proyecto ejecutar el siguiente comando:
```bash
npx playwright test
```

### Ejecutar solamente los test de UI:
Desde la raiz del proyecto ejecutar el siguiente comando:
```bash
npx playwright test ui-tests
```

### Ejecutar solamente los test de APIs:
Desde la raiz del proyecto ejecutar el siguiente comando:
```bash
npx playwright test api-tests
```
### Configuración de GitHub Actions
Configuré GitHub Actions para ejecutar las pruebas automáticamente en cada push a la rama principal y en un horario específico (semanalmente los días Lunes a las 15:00hs de Argentina.). Esto asegura que las pruebas se ejecuten de manera continua y se detecten problemas lo antes posible.


La URL del ambiente de purebas se encuentra protegida de exposiciones mediante la feature de Secrets de GitHub Actions.

El workflow se ejecutará ante cada evento de push a la branch de ´'main', también el mismo se puede ejecutar a demanda desde el portal de github Actions.

Los artefactos generados durante la ejecución de las pruebas en GitHub Actions, incluyendo trazas y capturas de pantalla, se pueden descargar desde la sección de artefactos del job correspondiente en GitHub Actions.

### Ver Reportes
Configuré Playwright para generar reportes HTML detallados, así como capturas de pantalla en caso de fallos. Esto facilita la depuración y el análisis de los resultados de las pruebas.
Los reportes HTML generados por Playwright se pueden encontrar en el directorio playgwright-report/html. Para visualizar el mismo, abre el archivo `index.html` en tu navegador.


## Preguntas Extra

### Imagina que ya estamos trabajando juntos y que la suite de pruebas creciera a 500 tests, ¿qué cambios harías o sugerirías en la estructura?

No soy partidario de llegar a ese contexto de tener tantas pruebas automatizadas, (no sin antes haber tomado todas las medidas preventivas para evitarlo), puesto que pienso que la automatización es una ventaja que nos ayuda a reducir costos,tiempos y probabilidad de errores humanos, no hay que abusar de ella y tener un criterio bien definido de que tiene sentido y prioridad ser destinado a una automatización. Pero si ya ingreso a un proyecto con esa realidad, lo primero que haría es lo siguiente:
1. **Estrategias de Ejecución**: Implementar una estrategia de ejecución de pruebas basada en prioridades, ejecutando primero las pruebas críticas y luego las menos críticas.
2.  **Paralelización de Pruebas**: Aumentar el número de workers para ejecutar las pruebas en paralelo y reducir el tiempo total de ejecución.
3. **Optimización de Recursos**: Utilizar servicios de CI/CD que permitan la ejecución distribuida de pruebas en múltiples máquinas.

### Si hay flakiness en un test, ¿cómo lo manejarías?

1. **Reintentos**: Configurar reintentos automáticos para las pruebas que fallan de manera intermitente.
2. **Análisis de Flakiness**: Analizar las causas del flakiness y aplicar soluciones específicas, como mejorar la sincronización o aumentar los tiempos de espera.
3. **Monitoreo y Reporte**: Implementar monitoreo y reporte de flakiness para identificar patrones y áreas problemáticas.

## Decisiones Técnicas

### Elección de arquitectura POM (Page Object Model)
En este proyecto, se utiliza el **Page Object Model (POM)** para organizar y estructurar las pruebas de UI de manera más mantenible y reutilizable. 

### Estructura del Proyecto

- **pages**: Contiene las clases que representan las páginas de la aplicación. Por ejemplo:
  - **`HomePage`**: Define los métodos y selectores para interactuar con la página de inicio.
  - **`ResultsPage`**: Define los métodos y selectores para interactuar con la página de resultados.

### Ejemplo de Uso en search.spec.ts

- **`HomePage`** y **`ResultsPage`** se importan y se instancian en cada prueba.
- **`homePage`**: Se utiliza para abrir la página de inicio y completar el formulario de búsqueda.
- **`resultsPage`**: Se utiliza para verificar los resultados de la búsqueda.

### Beneficios

- **Reutilización**: Los métodos y selectores definidos en las clases de página pueden ser reutilizados en múltiples pruebas.
- **Mantenibilidad**: Los cambios en la UI solo requieren actualizaciones en las clases de página, no en todas las pruebas.

Este enfoque mejora la organización y facilita la gestión de las pruebas a medida que el proyecto crece.

### Elección de TypeScript

TypeScript ofrece una serie de ventajas sobre JavaScript que mejoran la calidad del código, la productividad del desarrollador y la mantenibilidad del proyecto. Estas razones hacen que sea una elección sólida para proyectos de pruebas automatizadas como este.


## Datos de Pruebas de API

A continuación se muestra un ejemplo de los datos obtenidos del happy path en las pruebas de API:

```json
{
  "status": "success",
  "data": {
    "id": 12345,
    "name": "Test User",
    "email": "testuser@example.com"
  }
}
```

Estos datos se pueden escribir en un archivo `.json` desde el test utilizando el siguiente código:

```typescript
import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Happy path API test', async ({ request }) => {
  const response = await request.post('/api/endpoint', {
    data: {
      name: 'Test User',
      email: 'testuser@example.com'
    }
  });

  const responseData = await response.json();
  expect(response.status()).toBe(200);
  expect(responseData.status).toBe('success');

  // Escribir la respuesta en un archivo .json
  fs.writeFileSync('api-happy-path-response.json', JSON.stringify(responseData, null, 2));
});
```

## Conclusión

Este proyecto demuestra cómo configurar y ejecutar pruebas de UI y API utilizando Playwright, así como la integración con GitHub Actions para la ejecución continua de pruebas. Las decisiones técnicas tomadas aseguran una configuración robusta y eficiente, y las estrategias propuestas para manejar el crecimiento de la suite de pruebas y el flakiness garantizan la mantenibilidad y la confiabilidad a largo plazo.
```

Este README proporciona instrucciones claras sobre cómo ejecutar las pruebas, detalles sobre la implementación, respuestas a las preguntas adicionales, y una explicación de las decisiones técnicas tomadas. Además, incluye un ejemplo de cómo escribir los datos de las pruebas de API en un archivo `.json`.

Cualquier inquietud o consulta no dude en contactarme.


Germán Kohn
germankohn@gmail.com
11-6956-8210
https://www.linkedin.com/in/germankohn/
Sr QA Automation
