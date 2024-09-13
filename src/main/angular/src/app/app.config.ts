import {
  ApplicationConfig,
  importProvidersFrom,
  makeEnvironmentProviders, Provider,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import {routes} from './app.routes';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";

export const appConfig: ApplicationConfig = {
  providers: [
    makeEnvironmentProviders([importProvidersFrom(UiLibraryAngularModule.forRoot())] as unknown as Provider[]),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withHashLocation()),
  ]
};
