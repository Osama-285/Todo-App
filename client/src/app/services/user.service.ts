import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private userId = 'userID';
  constructor(private http: HttpClient) {}

  registerUser(
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    const userData = { username, email, password };
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  loginUser(email: string, password: string): Observable<any> {
    const userData = { email, password };
    console.log(userData);
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  getUserID(): string | null {
    return localStorage.getItem(this.userId);
  }

  setUserID(inputUserID: string): void {
    localStorage.setItem(this.userId, inputUserID);
  }
}
