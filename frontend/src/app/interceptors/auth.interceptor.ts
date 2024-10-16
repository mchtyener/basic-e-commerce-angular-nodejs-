import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const authToken = userService.getAuthToken();
  let authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
      Accept: 'application/json'
    },
    withCredentials: true
  });

  if (!req.headers.has('Content-Type') && req.url.includes('upload')) {
    authReq = authReq.clone({
      setHeaders: {
        'Access-Control-Allow-Credentials': 'true'
      }
    });
  }
  return next(authReq);
};