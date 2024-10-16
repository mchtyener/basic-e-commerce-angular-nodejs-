import { Injectable, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { User } from '../models/user';

export interface Token {
  exp: number,
  iat: number
  user: User
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  tokenKey = 'speedy-tiger';
  isLoggedInSignal: WritableSignal<boolean> = signal(false);
  userInformation: WritableSignal<User | undefined> = signal(undefined)

  constructor() {
    this.isLoggedIn()
    this.getUser();
  }

  isLoggedIn(): void {
    this.isLoggedInSignal.set(!!this.getAuthToken());
  }

  setAuthToken(authToken: string): void {
    localStorage.setItem(this.tokenKey, authToken);
  }

  getUser() {
    const token = this.getAuthToken();
    if (!token) {
      return
    }
    let data: Token = jwtDecode(token)
    this.userInformation.set(data.user)
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSignal.set(false);
  }

  getAuthToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

}
