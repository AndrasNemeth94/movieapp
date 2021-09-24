import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../classes/movie';
import { Observable, of, pipe } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movieURL = 'http://localhost:8100/assets/movies.json';
  movies: Observable<Movie[]>;
  moviesToSend: Movie[];

  constructor(private http: HttpClient) {}

  //get all movies from JSON
  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.movieURL);
  }

  //username,year,rating filter func
  filterForUser(
    movies: Movie[],
    selected: string,
    status: string
  ): Observable<Movie[]> {
    console.log('FILTERFORUSER');
    console.log('Beérkező filterbe: ' + JSON.stringify(movies));
    //get username from token
    const username = localStorage.getItem('auth-token').slice(13);
    console.log('UserName: ' + username);
    //filter movies based on username
    this.moviesToSend = movies.filter((movie) => movie.user === username);

    console.log('Átalakítás után: ' + JSON.stringify(this.moviesToSend));
    //filter movies based on year and rating
    this.moviesToSend = this.filterMovies(this.moviesToSend, selected, status);

    localStorage.removeItem('movies');
    localStorage.setItem('movies', JSON.stringify(this.moviesToSend));
    return (this.movies = of(this.moviesToSend));
  }

  //filter DESC&ASC by rate and year
  filterMovies(movies: Movie[], sortStyle: string, selected: string): Movie[] {
    console.log('filterMovies: ' + JSON.stringify(movies));
    if (sortStyle === 'year') {
      if (selected === 'DESC') {
        this.moviesToSend = movies.sort((current, next) => {
          if (current.year > next.year) {
            return -1;
          }
          if (current.year < next.year) {
            return 1;
          }
        });
      }
      if (selected === 'ASC') {
        this.moviesToSend = movies.sort((current, next) => {
          if (current.year > next.year) {
            return 1;
          }
          if (current.year < next.year) {
            return -1;
          }
        });
      }
    }
    if (sortStyle === 'rate') {
      if (selected === 'DESC') {
        this.moviesToSend = movies.sort((current, next) => {
          if (current.rate > next.rate) {
            return -1;
          }
          if (current.rate < next.rate) {
            return 1;
          }
        });
      }
      if (selected === 'ASC') {
        this.moviesToSend = movies.sort((current, next) => {
          if (current.rate > next.rate) {
            return 1;
          }
          if (current.rate < next.rate) {
            return -1;
          }
        });
      }
    }
    console.log('Filter szűrés után: ' + JSON.stringify(this.moviesToSend));
    return this.moviesToSend;
  }

  //delete try
  deleteMovie(id: number): Movie[] {
    this.moviesToSend = JSON.parse(localStorage.getItem(`movies`));
    this.moviesToSend = this.moviesToSend.filter((movie) => movie.id !== id);

    localStorage.removeItem('movies');
    localStorage.setItem('movies', JSON.stringify(this.moviesToSend));
    this.movies = of(this.moviesToSend);
    return this.moviesToSend;
  }
}
