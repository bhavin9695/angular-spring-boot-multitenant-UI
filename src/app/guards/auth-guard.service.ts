import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {NavigationService} from '../services/navigation.service';
import {Observable} from 'rxjs';
import {Constants} from '../commons/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(public auth: AuthService,
              private navigationService: NavigationService) {
  }

  async canActivate(route: ActivatedRouteSnapshot) {
    const isAuthenticated = await this.auth.isAuthenticated();
    if (!isAuthenticated) {
      this.navigationService.navigateToLogin();
      return false;
    }
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute);
  }


}

