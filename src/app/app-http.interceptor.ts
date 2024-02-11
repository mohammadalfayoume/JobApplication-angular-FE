import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();

    const token = localStorage.getItem("token");
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const options = { headers: headers };

    const newRequest = httpRequest.clone({
      headers: options.headers
    });
      //any alteration in httpRequest can be done here
    return next.handle(newRequest);
  }
}
