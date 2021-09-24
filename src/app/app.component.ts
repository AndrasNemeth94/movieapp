import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './classes/user';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  users: User[] = [
    {
      id: 1,
      firstName: 'Sara',
      lastName: 'Walters',
      email: 'sara@gmail.com',
      password: '1234',
    },
    {
      id: 2,
      firstName: 'András',
      lastName: 'Németh',
      email: 'nfsandris@gmail.com',
      password: '111',
    },
  ];

  constructor(
    private authService: AuthService,
    private movieService: MoviesService
  ) {
    localStorage.setItem('users', JSON.stringify(this.users));
    this.movieService.getAllMovies().subscribe(
      (data) => localStorage.setItem('movies', JSON.stringify(data)),
      (error) => console.log('Error while fetching movies!')
    );
  }
}
