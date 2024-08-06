import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { isLoggedIn, user } from '../state/user.state';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const isVisitingAuth = state.url.includes('auth');

  if (isLoggedIn()) {
    if (isVisitingAuth) {
      router.navigate(['/']);
      return false;
    }

    if (next.data && next.data['roles']) {
      if (next.data['roles'].includes(user()!.role)) {
        return true;
      } else {
        router.navigate(['/unauthorized']);
        return false;
      }
    } else {
      return true;
    }
  } else {
    if (isVisitingAuth) {
      return true;
    } else {
      router.navigate(['/auth/login']);
      return false;
    }
  }
};
