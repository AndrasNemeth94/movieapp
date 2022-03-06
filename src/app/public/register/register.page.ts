import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
  registerForm: FormGroup;
  date = new Date();
  idTag = this.date.getDate() + '_'+ this.date.getTime();

  description = false;

  constructor(
    private authService: AuthService,
    protected formBuilder: FormBuilder,
    private router: Router
    ) {
      console.log('RegisterPage::constructor()');
    }

  ngOnInit() {
    console.log('RegisterPage::ngOnInit()');
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  showDescription($event) {
    console.log('RegisterPage::showDescription() ev: ', $event.target.value);
  }

  trackInput($event) {
    console.log('RegisterPage::trackInput() ev: ', $event.target.value);
  }

  submitForm() {
    console.log('RegisterPage::submitForm()');
    if(this.registerForm.valid) {
      this.userModel = {
        id: parseInt(this.idTag, 2),
        firstName: this.registerForm.get('firstName').value,
        lastName: this.registerForm.get('lastName').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value
      };
      console.log('RegisterPage::submitForm() userModel: ', this.userModel);
      if(this.userModel != null) {
        this.authService.signUpUser(this.userModel);
      }
      else {
        console.error('RegisterPage::submitForm() userModel: ', this.userModel);
      }
    }
    else {
      alert('Some items in the form is not filled!');
    }
  }

  back() {
    this.router.navigate(['/login']);
  }
}
