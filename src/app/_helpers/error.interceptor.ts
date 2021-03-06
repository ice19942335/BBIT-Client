import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthenticationService} from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        location.replace('/login');
        return throwError('Please authorize');
      } else if (err.status === 400) {
        if (err.error.errors === undefined) {
          return throwError(err.error);
        }
        return throwError(err.error.errors.join(', '));
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
