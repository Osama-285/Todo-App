// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'Authorization';

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    return !!token;
  }
}
