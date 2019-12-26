import {Component, OnInit} from '@angular/core';
import {Customer} from '../models/data.model';
import {CustomerService} from '../services/customer.service';
import {AuthService} from '../services/auth.service';
import {NavigationService} from '../services/navigation.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService,
              private authService: AuthService,
              private navService: NavigationService) {
  }

  customerList: Customer[] = [];


  ngOnInit() {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerService.getAllCustomer().subscribe(
      (response) => {
        this.customerList = response;
      }
    );
  }

  onClickUploadFile() {
    const elem = document.getElementById('upload-file-input');
    (elem as HTMLInputElement).value = null;
    elem.click();

  }

  importFromExcel(event) {
    this.customerService.importFromFile(event.target.files[0]).subscribe(
      response => {
        this.getAllCustomer();
      }
    );
  }

  logout() {
    this.authService.logout();
    this.navService.navigateToLogin();
  }

}
