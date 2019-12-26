import {Constants} from '../commons/constants';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(Constants.TOKEN_KEY);
    let newHeaders = req.headers;
    if (this.isAllowedWithoutAuthorization(req.url)) {
      return next.handle(req);
    } else if (token) {
      newHeaders = newHeaders.append('Authorization', 'Bearer ' + token);
      const authReq = req.clone({headers: newHeaders});
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }

  private isAllowedWithoutAuthorization(requestUrl: string): boolean {
    for (const index in Constants.ALLOWED_URL) {
      const url = Constants.ALLOWED_URL[index];
      if (requestUrl.includes(url)) {
        return true;
      }
    }
    return false;
  }
}
