import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withXsrfConfiguration,
} from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UserService } from './auth/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withXsrfConfiguration({})),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    {
      provide: APP_INITIALIZER,
      useFactory: (userService: UserService) => {
        return userService.setUserProfile.bind(userService);
      },
      deps: [UserService],
      multi: true,
    },
  ],
};
