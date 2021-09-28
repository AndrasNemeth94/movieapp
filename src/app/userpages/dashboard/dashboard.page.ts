import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from '../../classes/movie';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  filterOptionRating: string[] = ['ASC', 'DESC'];
  filterOptionYear: string[] = ['ASC', 'DESC'];
  selectedYear = 'ASC';
  selectedRating = 'ASC';
  movies: Observable<Movie[]>;

  constructor(
    private authService: AuthService,
    private movieService: MoviesService,
    private router: Router
  ) {}

  //delete single movie
  deleteCard(id: number) {
    this.movies = this.movieService.deleteMovie(id);
    return this.movies;
  }
  watchRateSelection() {
    console.log(
      'Rate selection changed: ' + this.selectedRating + ', sortstyle: Rate'
    );
    this.movieService
      .filterForUser(this.movies, 'Rate', this.selectedRating)
      .subscribe((data) => (this.movies = of(data)));
    return this.movies;
  }
  watchYearSelection() {
    console.log(
      'Year selection changed: ' + this.selectedYear + ', sortstyle: Year'
    );
    this.movieService
      .filterForUser(this.movies, 'Year', this.selectedYear)
      .subscribe((data) => (this.movies = of(data)));
    return this.movies;
  }
  newMovie() {
    this.router.navigate(['userpages/addmovie']);
  }
  logout() {
    this.authService.userLogout();
  }
  ngOnInit() {
    console.log('NGONINIT FIRED');

    //first call for filtered movies, based on rating
    this.movieService
      .getAllMovies('Rate', this.selectedRating)
      .subscribe((data) => (this.movies = of(data)));
  }
}
