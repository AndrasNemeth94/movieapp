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
  repass: string;
  disableButton = true;
  constructor(private authService: AuthService) {}

  onKeyUp(event: any) {
    this.repass = event.target.value;
    if (this.repass === this.userModel.password) {
      console.log('Bingo!');
      this.disableButton = false;
    } else {
      console.log('Its not the same!');
    }
  }
  signUp() {
    console.log('repass' + this.repass);
    this.authService.signUpUser(this.userModel);
    this.authService.sendUserToDashboard();
  }
  ngOnInit() {}
}
