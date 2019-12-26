import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {UrlConfigService} from '../commons/url-config.service';
import {Customer} from '../models/data.model';
import {HttpHeaders} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CustomerService {

  constructor(private apiService: ApiService) {
  }

  getAllCustomer() {
    return this.apiService.get(UrlConfigService.GET_ALL_CUSTOMER, undefined, false);
  }

  addNewCustomer(customer: Customer) {
    return this.apiService.post(UrlConfigService.ADD_CUSTOMER,
      customer, undefined, 'post', false);
  }

  importFromFile(file: File) {
    const form = new FormData();
    form.append('file', file);

    const headers = new HttpHeaders({
      enctype: 'multipart/form-data'
    });

    return this.apiService.post(UrlConfigService.READ_EXCEL_URL, form, headers, 'post', false);
  }
}
