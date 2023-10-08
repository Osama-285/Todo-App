// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the token from localStorage
    const token = localStorage.getItem('Authorization');

    const authReq = token
      ? request.clone({
          setHeaders: {
            Authorization: token,
          },
        })
      : request;

    return next.handle(authReq);
  }
}
