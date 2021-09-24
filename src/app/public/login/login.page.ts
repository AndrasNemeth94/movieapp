import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userEmail = '';
  userPassword = '';
  constructor(private authService: AuthService) {}

  checkUserData() {
    console.log('SEnd this: ' + this.userEmail + ', ' + this.userPassword);
    this.authService.userLogin(this.userEmail, this.userPassword);
  }
  ngOnInit() {}
}
