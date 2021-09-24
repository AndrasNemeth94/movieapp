import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/classes/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.page.html',
  styleUrls: ['./addmovie.page.scss'],
})
export class AddmoviePage implements OnInit {
  defaultThumbnailURL =
    'https://www.freeiconspng.com/uploads/no-image-icon-13.png';
  firstName = localStorage.getItem('auth-token').slice(13);
  defaultImageSRC = this.defaultThumbnailURL;
  storageLength = localStorage.getItem('movies').length;
  newMovie: Movie = new Movie(
    this.storageLength + 1,
    '',
    null,
    null,
    this.firstName,
    '',
    ''
  );
  movies: Movie[];

  showDescriptionErr = false;

  constructor(private router: Router, private movieService: MoviesService) {}
  backToDashBoard() {
    this.router.navigate(['userpages/dashboard']);
  }

  onSubmit() {
    console.log('Add fired' + JSON.stringify(this.newMovie));
    this.movies = JSON.parse(localStorage.getItem('movies'));
    this.movies.push(this.newMovie);

    localStorage.removeItem('movies');
    localStorage.setItem('movies', JSON.stringify(this.movies));

    this.movieService.filterForUser(this.movies, 'year', 'ASC');
    return this.movies;
  }
  watchThumbnailInput($event) {
    console.log('new thumb: ' + $event.target.value);

    this.defaultImageSRC = $event.target.value;
  }
  ngOnInit() {}
}
