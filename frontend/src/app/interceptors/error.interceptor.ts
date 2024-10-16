import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { errorSweetAlert } from '../data/swert-alert';
import { UserService } from '../services/user.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService)
  const router = inject(Router)
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (!error.error?.token) {
        userService.removeAuthToken();
        userService.isLoggedInSignal.set(false);
        errorSweetAlert('Token Süresi Bitti')
        router.navigate([''])
      }
      if (error.status === 400) {
        alert(error.message)
      }
      return throwError(() => new Error('Bir hata oluştu, lütfen tekrar deneyin.'));
    })
  );
};
