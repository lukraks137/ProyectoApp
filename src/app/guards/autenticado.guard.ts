import { inject } from '@angular/core';
import { AuthService} from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const autenticadoGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (await authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['ingreso']);
    return false;
  }
};
