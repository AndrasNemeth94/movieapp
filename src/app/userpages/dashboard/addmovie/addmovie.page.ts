import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//interfaces
import { IMovie } from 'src/app/interfaces/export-interfaces';

//services
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.page.html',
  styleUrls: ['./addmovie.page.scss'],
})
export class AddmoviePage implements OnInit {

  newMovie: IMovie;
  movies: IMovie[];

  defaultThumbnailURL = 'https://www.freeiconspng.com/uploads/no-image-icon-13.png';
  firstName = localStorage.getItem('auth-token').slice(13);
  defaultImageSRC = this.defaultThumbnailURL;

  storageLength = localStorage.getItem('movies').length;

  constructor(private router: Router, private movieService: MoviesService) {}
  backToDashBoard() {
    this.router.navigate(['userpages/dashboard']);
  }

  ngOnInit() {

  }

  onSubmit() {
    this.movieService.addMovie(this.newMovie);
    return this.movies;
  }

  watchThumbnailInput($event) {
    console.log('new thumb: ' + $event.target.value);

    this.defaultImageSRC = $event.target.value;
  }
}
