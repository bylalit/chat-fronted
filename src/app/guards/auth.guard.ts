import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { map } from 'rxjs';



export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(UserService)

  return authService.authCheck().pipe(
    map((data) => {
      // console.log(data);
      if(data.success){
        return true
      }else{
        router.navigate(['/login']);
        return false
      }
    })
  )


};
