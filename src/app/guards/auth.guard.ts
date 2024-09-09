import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const urlTreeReturn = router.createUrlTree(['/login']);

  const token = localStorage.getItem('token');

  if(token){
    return true;
  }
  else{
    return urlTreeReturn;
  }
};
