import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Constants} from '../commons/constants';
import {map} from 'rxjs/operators';
import {User} from '../models/data.model';
import {AuthResponse} from '../models/dto.models';
import {UrlConfigService} from '../commons/url-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private user: User;

  private setSession(token: string) {
    localStorage.setItem(Constants.TOKEN_KEY, token);
  }

  private setUser(user: User) {
    localStorage.setItem(Constants.USER_KEY, JSON.stringify(user));
    this.user = User.parseJsonToObj(User, user);
  }

  private getUserFromLocalStorage(): User {
    const stringifiedUser = localStorage.getItem(Constants.USER_KEY);
    return User.parseJsonToObj(User, JSON.parse(stringifiedUser));
  }

  logout() {
    localStorage.removeItem(Constants.USER_KEY);
    localStorage.removeItem(Constants.TOKEN_KEY);
  }

  isAuthenticated(): boolean | Promise<any> {
    const token = localStorage.getItem(Constants.TOKEN_KEY);
    if (!token) {
      return false;
    }

    return this.post(`${UrlConfigService.VALIDATE_SESSION}`,
      {token}, undefined, undefined, false).pipe(map((response) => {
        this.handleLoginResponse(response);
        return true;
      })
    ).toPromise().catch(error => {
      this.logout();
      return false;
    });
  }

  public isLoggedIn(): boolean {
    return !!(localStorage.getItem(Constants.TOKEN_KEY) && localStorage.getItem(Constants.USER_KEY));
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  handleLoginResponse(response: AuthResponse) {
    this.setSession(response.token);
    delete response.token;
    this.setUser(response.user);
  }

  public get getUserClone(): User {
    if (!this.user) {
      this.user = this.getUserFromLocalStorage();
    }
    return this.user.clone();
  }

  private get getUser(): User {
    if (!this.user) {
      this.user = this.getUserFromLocalStorage();
    }
    return this.user;
  }
}
