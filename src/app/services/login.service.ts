import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {UrlConfigService} from '../commons/url-config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService) {
  }

  login(username: string, password: string) {
    return this.apiService.post(UrlConfigService.LOGIN,
      {userName: username, password},
      undefined, 'Post', false);
  }

  addUser(username: string, password: string, tenant: string) {
    return this.apiService.post(UrlConfigService.ADD_USER,
      {username, password, tenant},
      undefined, 'post', false);
  }

}
