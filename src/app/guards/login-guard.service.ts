import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {NavigationService} from '../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
  constructor(public auth: AuthService,
              private navigationService: NavigationService) {
  }

  async canActivate() {
    const isAuthenticated = await this.auth.isAuthenticated();
    if (isAuthenticated) {
      this.navigationService.navigateToCustomerList();
      return true;
    }

    return true;
  }
}
