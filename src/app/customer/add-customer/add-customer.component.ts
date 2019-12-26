import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Customer} from '../../models/data.model';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  constructor(private customerService: CustomerService) {
  }

  customer: Customer = new Customer();
  @Output() refresh = new EventEmitter<void>();

  ngOnInit() {
  }


  addNewCustomer() {
    this.customerService.addNewCustomer(this.customer).subscribe(
      (response) => {
        this.refresh.emit();
      }
    );

  }

}
