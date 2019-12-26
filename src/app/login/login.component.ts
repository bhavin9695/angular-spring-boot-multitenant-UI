import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from '../services/login.service';
import {AuthService} from '../services/auth.service';
import {NavigationService} from '../services/navigation.service';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  notRegistered = false;

  loginMessage: string;
  isLoginSuccess = false;
  @ViewChild('loginForm', {static: false}) loginForm: NgForm;
  @ViewChild('registrationForm', {static: false}) registrationForm: NgForm;

  registrationMessage: string;
  isRegistrationSuccess = false;

  username: string;
  password: string;
  tenant: string;

  tokenExpireSubscriber: Subscription;

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.tokenExpireSubscriber = this.authService.getTokenExpireEmitter().subscribe(
      () => {
        this.authService.logout();
      }
    );
  }

  login() {
    this.loginMessage = undefined;
    this.isLoginSuccess = false;

    this.loginService.login(this.username, this.password).subscribe(
      response => {
        this.isLoginSuccess = true;
        this.loginMessage = 'Login successful!!';
        this.authService.handleLoginResponse(response);
        this.navigationService.navigateToCustomerList();
      }, (error1) => {
        this.isLoginSuccess = false;
        this.loginMessage = (error1.error.description) ? error1.error.description : 'Login failed!!';
      }
    );
  }

  registration() {
    this.registrationMessage = undefined;
    this.isRegistrationSuccess = false;

    this.loginService.addUser(this.username, this.password, this.tenant).subscribe(
      response => {
        this.isRegistrationSuccess = true;
        this.registrationMessage = 'Registration successful!!';
        this.notRegistered = false;
      }, (error1) => {
        this.isRegistrationSuccess = false;
        this.loginMessage = (error1.error.description) ? error1.error.description : 'Registration failed!!';
      }
    );
  }

}
