import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';

import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  NbThemeModule,
  NbSidebarModule,
  NbMenuModule,
  NbDialogModule,
  NbToastrModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { DEFAULT_THEME } from './@theme/styles/theme.default';
import { COSMIC_THEME } from './@theme/styles/theme.cosmic';
import { CORPORATE_THEME } from './@theme/styles/theme.corporate';
import { DARK_THEME } from './@theme/styles/theme.dark';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), provideRouter(routes),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(
      NbThemeModule.forRoot(
        { name: 'default' },
        [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME]
      ),
      NbSidebarModule.forRoot(),
      NbMenuModule.forRoot(),
      NbDialogModule.forRoot(),
      NbToastrModule.forRoot(),
      NbEvaIconsModule
    ),
  ],
};