import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  makeEnvironmentProviders,
  Provider,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import {routes} from './app.routes';
import {UiLibraryAngularModule} from "@six-group/ui-library-angular";
import {DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData} from "@angular/common";
import deCH from '@angular/common/locales/de-CH';
import {provideHttpClient} from "@angular/common/http";

registerLocaleData(deCH);

export const appConfig: ApplicationConfig = {
  providers: [
    makeEnvironmentProviders([importProvidersFrom(UiLibraryAngularModule.forRoot())] as unknown as Provider[]),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    {provide: LOCALE_ID, useValue: 'de-CH'},
    {provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {dateFormat: 'dd.MM.yyyy HH:mm'}},
  ]
};
