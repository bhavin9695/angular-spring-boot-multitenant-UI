import {Injectable} from '@angular/core';

import {environment} from '../../environments/environment';

@Injectable()
export class UrlConfigService {

  private static readonly _API_URL = '/altimetrik';

  private static readonly _BASE_ADDRESS = environment.serverURL + UrlConfigService._API_URL;

  static readonly _ADD_USER = '/add/user';

  static readonly _LOGIN = '/generate/token';

  static readonly _VALIDATE_SESSION = '/validate/token';

  private static readonly _ADD_CUSTOMER = UrlConfigService._BASE_ADDRESS + '/add/customer';

  private static readonly _GET_CUSTOMER = UrlConfigService._BASE_ADDRESS + '/get/customer/{customerId}';

  private static readonly _GET_ALL_CUSTOMER = UrlConfigService._BASE_ADDRESS + '/get/all/customer';

  private static readonly _READ_EXCEL_URL = UrlConfigService._BASE_ADDRESS + '/read/excel';


  static get BASE_ADDRESS(): string {
    return this._BASE_ADDRESS;
  }

  static get ADD_USER(): string {
    return this._BASE_ADDRESS + this._ADD_USER;
  }

  static get LOGIN(): string {
    return this._BASE_ADDRESS + this._LOGIN;
  }

  static get VALIDATE_SESSION(): string {
    return this._BASE_ADDRESS + this._VALIDATE_SESSION;
  }

  static get ADD_CUSTOMER(): string {
    return this._ADD_CUSTOMER;
  }

  static getCustomer(param: { customerId: number }): string {
    return UrlConfigService.generateReqParamUrl(this._GET_CUSTOMER, param);
  }


  static get GET_ALL_CUSTOMER(): string {
    return this._GET_ALL_CUSTOMER;
  }


  static get READ_EXCEL_URL(): string {
    return this._READ_EXCEL_URL;
  }

  private static generateReqParamUrl(url: string, params: any): string {
    let tempUrl = url;
    for (const key in params) {
      tempUrl = tempUrl.replace(`{${key}}`, params[key]);
    }
    return tempUrl;
  }

}
