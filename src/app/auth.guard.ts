import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return auth.check().pipe(
    map((ok: boolean) => {
      if (!ok) {
        auth.logout();
        router.navigate(['/login']);
      }
      return ok;
    })
  );
};
