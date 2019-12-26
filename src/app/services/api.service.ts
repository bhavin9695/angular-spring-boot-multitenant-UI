import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventEmitter, Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NavigationService} from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static tokenExpireEmitter = new EventEmitter<void>();

  headers = new HttpHeaders({
    Accept: 'application/json'
  });

  constructor(
    private http: HttpClient, private injector: Injector,
    private navigationService: NavigationService
  ) {
  }

  anonGet(path: string): Observable<any> {
    return this.http.get(
      path,
      {
        headers: this.headers,
        withCredentials: true
      }
    );
  }

  get(path: string, customHeaders?, withCredentials = true): Observable<any> {
    return this.http.get(
      path,
      {
        headers: customHeaders || this.headers,
        withCredentials
      }
    ).pipe(catchError(this.checkAndRedirectToLoginIfUnAuthorised.bind(this, withCredentials)));
  }

  getWithUnAuthorisedCatch(path: string, customHeaders?, withCredentials = true): Observable<any> {
    return this.http.get(
      path,
      {
        headers: customHeaders || this.headers,
        withCredentials
      }
    ).pipe(catchError(this.checkAndRedirectToLoginIfUnAuthorised.bind(this, withCredentials)));
  }

  getWithOutCatch(path: string): Observable<any> {
    return this.http.get(
      path,
      {
        headers: this.headers,
        withCredentials: true
      }
    );
  }

  post(path: string, body, customHeaders?, method = 'Post', withCredentials = true): Observable<any> {
    return this.http.request(
      method,
      path,
      {
        body,
        headers: customHeaders || this.headers,
        withCredentials
      }
    ).pipe(catchError(this.checkAndRedirectToLoginIfUnAuthorised.bind(this, withCredentials)));
  }

  put(path: string, body: any, customHeaders?, withCredentials = true): Observable<any> {
    return this.post(path, body, customHeaders, 'Put', withCredentials);
  }

  patch(path: string, body: any, customHeaders?, withCredentials = true): Observable<any> {
    return this.post(path, body, customHeaders, 'Patch', withCredentials);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  // Display error if logged in, otherwise redirect to IDP
  private checkAuth(error: any) {
    if (error && error.status === 403) {
      // this.redirectIfUnauth();
    } else {
      // this.displayError(error);
    }
    return throwError(error);
  }


  private checkAndRedirectToLoginIfUnAuthorised(withCredentials, error: any) {
    if (error && error.status === 401 && withCredentials) {
      this.navigationService.navigateToLogin();
      setTimeout(() => {
        this.getTokenExpireEmitter().emit();
      }, 500);

    } else {
      // this.displayError(error);
    }
    return throwError(error);
  }

  private get router(): Router { // this creates router property on your service.
    return this.injector.get(Router);
  }

  private redirectIfUnauth() {
    this.router.navigate(['unauthorised']);
  }

  private redirectToLoginIfUnAuth() {
    this.router.navigate(['login']);
  }

  public getTokenExpireEmitter(): EventEmitter<void> {
    return ApiService.tokenExpireEmitter;
  }

}
