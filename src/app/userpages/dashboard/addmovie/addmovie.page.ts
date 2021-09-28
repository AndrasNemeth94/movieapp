import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/classes/movie';
import { MoviesService } from 'src/app/services/movies.service';

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
  //for ID generation
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

  constructor(private router: Router, private movieService: MoviesService) {}
  backToDashBoard() {
    this.router.navigate(['userpages/dashboard']);
  }

  onSubmit() {
    this.movieService.addMovie(this.newMovie);

    return this.movies;
  }
  watchThumbnailInput($event) {
    console.log('new thumb: ' + $event.target.value);

    this.defaultImageSRC = $event.target.value;
  }
  ngOnInit() {}
}
