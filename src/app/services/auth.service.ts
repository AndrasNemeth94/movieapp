import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { MoviesService } from './movies.service';

const tokenKey = 'auth-token';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState = false;
  user: User;
  constructor(private router: Router, private movieService: MoviesService) {}

  userLogin(email: any, pw: any) {
    const users: User[] = JSON.parse(localStorage.getItem('users'));
    let token = null;
    users.forEach((el) => {
      if (el.email === email && el.password === pw) {
        token = localStorage.setItem(tokenKey, `Bearer-Token-${el.firstName}`);
      }
    });
    if (localStorage.getItem(tokenKey) != null) {
      this.authState = true;
      this.router.navigate(['userpages/dashboard']);
    } else {
      console.log('Error while logging in!');
    }
  }
  userLogout() {
    //clear storage
    localStorage.removeItem(tokenKey);
    localStorage.removeItem('movies');
    //set default movies to storage
    this.movieService.setMoviesInLocalStorage();
    this.authState = false;
    this.router.navigate(['login']);
  }

  //for authGuard
  isAuthenticated() {
    return this.authState;
  }

  checkUserToken() {
    if (localStorage.getItem(tokenKey) !== undefined) {
      this.router.navigate(['userpages/dashboard']);
    } else {
      console.log('Please log in!');
    }
  }

  signUpUser(user: User) {
    const users: User[] = JSON.parse(localStorage.getItem('users'));
    let errorMsg = '';
    users.forEach((el) => {
      if (el.email === user.email) {
        errorMsg += 'email';
      }
      if (el.password === user.password) {
        if (errorMsg !== '') {
          errorMsg += ', password';
        } else {
          errorMsg += 'password';
        }
      }
    });
    if (errorMsg === '') {
      users.push(user);
      localStorage.removeItem('users');
      localStorage.setItem('users', JSON.stringify(users));
      this.user = user;
      localStorage.setItem('auth-token', `Bearer-Token-${this.user.firstName}`);
      this.authState = true;
    }
    if (errorMsg !== '') {
      if (errorMsg.length > 10) {
        errorMsg += ' are already exist!';
        console.log('Error! ' + errorMsg);
      }
      if (errorMsg !== '' && errorMsg.length < 10) {
        errorMsg += ' is already exist!';
        console.log('Error! ' + errorMsg);
      }
    }
    return this.user;
  }

  sendUserToDashboard() {
    this.router.navigate(['userpages/dashboard']);
  }
}
