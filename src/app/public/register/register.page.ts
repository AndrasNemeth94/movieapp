import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userModel: User = new User('', '', '', '');
  repass: string = null;
  confirmed = true;
  disableButton = true;
  constructor(private authService: AuthService) {}

  onKeyUp(event: any) {
    this.repass = event.target.value;
    if (this.repass === this.userModel.password) {
      this.confirmed = true;
      this.disableButton = false;
    } else {
      this.confirmed = false;
    }
  }
  signUp() {
    this.authService.signUpUser(this.userModel);
    this.authService.sendUserToDashboard();
  }
  ngOnInit() {}
}
