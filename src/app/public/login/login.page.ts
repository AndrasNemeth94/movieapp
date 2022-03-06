import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//interfaces
import { IUser } from 'src/app/interfaces/IUser.interface';

//enums
import { InputList } from '../../enums/export-enums';

//services
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  pageTitle = 'Login';

  user: IUser;
  inputs: InputList;
  loginForm: FormGroup;
  description = false;

  constructor(
    private authService: AuthService,
    protected formBuilder: FormBuilder,
    protected route: Router
    ) {}

  ngOnInit() {
    console.log(`${this.pageTitle}::ngOnInit()`);
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  trackInput($event) {
    console.log(`${this.pageTitle}::trackInput()`, $event.target.id);
    const patchValue = $event.target.value;
    switch($event.target.id) {
      case InputList.userEmail:
        this.loginForm.patchValue({ email: patchValue });
        break;
      case InputList.userPassword:
        this.loginForm.patchValue({ password: patchValue });
        break;
    }
  }

  showDescription() {
    return this.description = !this.description;
  }

  submitForm() {
    console.log(`${this.pageTitle}::checkUserData() loginForm:`, this.loginForm.value);

    if(this.loginForm.valid && this.loginForm !== null) {

        this.user = {
          email: this.loginForm.get('email').value,
          password: this.loginForm.get('password').value
        };

        this.authService.userLogin(this.user);
    }
  }

  relocate() {
    this.route.navigate(['/register']);
  }
}
