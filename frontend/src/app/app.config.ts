import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideNgxStripe } from 'ngx-stripe';
// import { authInterceptor } from './interceptors/auth.interceptor';
import { RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideNgxStripe(
      'pk_test_51QrDW5QvnqWgELKLZj2YrdhTpMBX8bqwFVKpg2xcoxxRraV98d06x3cFvAwmjJJu7NRikjrRJo7rTn3WXEyZTExc00mHJE4ong'
    ),
    importProvidersFrom(RecaptchaModule),
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LdIPeUqAAAAALb40zGno681GN6PN0aEzD6V_aSy',
      } as RecaptchaSettings,
    },
  ],
};
