import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from '../../classes/movie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  movies: Movie[];
  dummyMovies: Movie[] = JSON.parse(localStorage.getItem('movies'));
  filterOptionRating: string[] = ['ASC', 'DESC'];
  filterOptionYear: string[] = ['ASC', 'DESC'];
  selectedYear = 'ASC';
  selectedRating = 'ASC';
  isRateDisabled = false;
  isYearDisabled = true;
  sortstyle = 'Year';

  constructor(
    private authService: AuthService,
    private movieService: MoviesService,
    private router: Router
  ) {}
  //reload :(
  reload() {
    this.ngOnInit();
  }
  //delete single movie
  deleteCard(id: number) {
    this.movies = this.movieService.deleteMovie(id);
    return this.movies;
  }
  //sortstyle
  sortMoviesBy() {
    if (!this.isRateDisabled) {
      this.sortstyle = 'Rate';
      this.isYearDisabled = false;
      this.isRateDisabled = true;
    } else {
      this.sortstyle = 'Year';
      this.isYearDisabled = true;
      this.isRateDisabled = false;
    }
    return this.isRateDisabled, this.isYearDisabled;
  }
  watchRateSelection() {
    console.log('Year selection changed: ' + this.selectedYear);
    this.movieService
      .filterForUser(this.dummyMovies, this.sortstyle, this.selectedRating)
      .subscribe((data) => (this.movies = data));
    return this.movies;
  }
  watchYearSelection() {
    console.log('Year selection changed: ' + this.selectedYear);
    this.movieService
      .filterForUser(this.dummyMovies, this.sortstyle, this.selectedYear)
      .subscribe((data) => (this.movies = data));
    return this.movies;
  }
  newMovie() {
    this.router.navigate(['userpages/addmovie']);
  }
  moviesChanged($event) {
    console.log('Movies: ' + JSON.stringify($event.target.value));
    this.movies = $event.target.value;
  }

  logout() {
    this.authService.userLogout();
  }
  ngOnInit() {
    console.log('Movies: ' + JSON.stringify(this.dummyMovies));

    if (!this.isYearDisabled) {
      this.movieService
        .filterForUser(this.dummyMovies, this.sortstyle, this.selectedYear)
        .subscribe(
          (data) => (this.movies = data),
          (error) =>
            console.log('Error while fetching movies!' + JSON.stringify(error))
        );
    } else {
      this.movieService
        .filterForUser(this.dummyMovies, this.sortstyle, this.selectedRating)
        .subscribe(
          (data) => (this.movies = data),
          (error) =>
            console.log('Error while fetching movies!' + JSON.stringify(error))
        );
    }
  }
}
