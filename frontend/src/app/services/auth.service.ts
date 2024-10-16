import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { EndpointService } from './endpoint.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    protected http: HttpClient,
    private endpointService: EndpointService,
    private userService: UserService) { }

  login(body: User): Observable<User> {
    const url = this.endpointService.buildUrl('authLogin');
    return this.http.post<User>(url, body).pipe(tap((res) => {
      if (res.success) {
        this.setAuthTokenAndAuthToken(res.token, true)
      }
    }))
  }

  register(body: User): Observable<User> {
    const url = this.endpointService.buildUrl('authRegister');
    return this.http.post<User>(url, body).pipe(tap((res) => {
      if (res.success) {
        this.setAuthTokenAndAuthToken(res.token, true)
      }
    }))
  }

  logout(): Observable<{ success: boolean }> {
    const url = this.endpointService.buildUrl('authLogout');
    return this.http.post<{ success: boolean }>(url, null).pipe(tap((res) => {
      if (res.success) {
        this.userService.removeAuthToken()
      }
    }));
  }

  setAuthTokenAndAuthToken(token: string, status: boolean) {
    this.userService.setAuthToken(token);
    this.userService.isLoggedInSignal.set(status);
  }

}
