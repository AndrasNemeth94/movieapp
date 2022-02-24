import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

//interfaces
import { IUser } from 'src/app/interfaces/IUser.interface';

//services
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userModel: IUser;
  repass: string = null;
  confirmed = true;
  disableButton = true;

  constructor(
    private authService: AuthService,
    protected formBuilder: FormBuilder
    ) {}

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
  ngOnInit() {

  }
}
