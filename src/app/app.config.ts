// Importaciones necesarias para la configuración de la aplicación.
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';          // Importa `ApplicationConfig` para definir la configuración de la aplicación y `provideZoneChangeDetection` para configurar la detección de cambios.
import { provideRouter } from '@angular/router';                                        // Importa `provideRouter` para configurar el enrutador de la aplicación.
import { provideHttpClient } from '@angular/common/http';                               // Importa `provideHttpClient` para configurar el cliente HTTP de Angular.
import { routes } from './app.routes';                                                  // Importa las rutas definidas en `app.routes.ts`.

// Exporta la configuración de la aplicación como un objeto `ApplicationConfig`.
export const appConfig: ApplicationConfig = {
  // Proveedores (providers) que se inyectan en toda la aplicación.
  providers: [
    // Configura la detección de cambios con `provideZoneChangeDetection`.
    // `eventCoalescing: true` optimiza la detección de cambios al agrupar eventos similares.
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Configura el enrutador de la aplicación con las rutas definidas en `app.routes.ts`.
    provideRouter(routes),

    // Configura el cliente HTTP de Angular.
    // `provideHttpClient` permite realizar solicitudes HTTP en toda la aplicación.
    provideHttpClient()
  ],
};
