import { Injectable } from '@angular/core';
import { Movie } from '../classes/movie';
import { Observable, of, pipe } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies: Observable<Movie[]>;
  moviestoDelete: Movie[];
  moviesToStorage: Movie[];

  baseMovies: Movie[] = [
    {
      id: 1,
      title: 'F&F2',
      year: 2003,
      rate: 5.9,
      description: `EX LAPD cop Brian O'Conner (Paul Walker) teams up with his ex-con friend Roman Pearce (Tyrese Gibson)
         Sand works with undercover U.S. Customs Service agent Monica Fuentes (Eva Mendes)
         to bring Miami-based drug lord Carter Verone (Cole Hauser) down.`,
      user: 'admin',
      thumbnailURL:
        'https://e1.pngegg.com/pngimages/611/773/png-clipart-movie-icon-1-2-fast-2-furious-2-fast-2-furious-movie-case-thumbnail.png',
    },
    {
      id: 2,
      title: 'Avengers:Endgame',
      year: 2019,
      rate: 8.4,
      description: `After the devastating events of Avengers: Infinity War (2018),
        the universe is in ruins due to the efforts of the Mad Titan,Thanos.`,
      user: 'Sara',
      thumbnailURL:
        'https://cdn.traileraddict.com/content/marvel-studios/avengers-endgame-poster-36.jpg',
    },
    {
      id: 3,
      title: 'Rick and Morty',
      year: 2013,
      rate: 9.2,
      description: `An animated series on adult-swim about the infinite adventures of Rick, a genius alcoholic and careless scientist,
         with his grandson Morty, a 14 year-old anxious boy who is not so smart. Together, they explore the infinite universes;
         causing mayhem and running into trouble.`,
      user: 'Sara',
      thumbnailURL:
        'https://bradleydyer.com/wp-content/uploads/2020/01/rick-and-morty-thumbnail-landscape.jpg',
    },
    {
      id: 4,
      title: 'Gravity Falls',
      year: 2012,
      rate: 8.9,
      description: `When Dipper and Mabel Pines get sent to their great-uncle Stan's shop in Gravity Falls, Oregon for the summer,
         they think it will be boring. But when Dipper find a strange journal in the woods,
         they learn some strange secrets about the town and its strange inhabitants.`,
      user: 'admin',
      thumbnailURL:
        'https://cdn.cinematerial.com/p/297x/ocvq3c14/gravity-falls-movie-poster-md.jpg?v=1456368671',
    },
    {
      id: 5,
      title: 'Snatch',
      year: 2017,
      rate: 7.0,
      description: `A group of up-and-coming hustlers who stumble upon a truck-load of stolen gold bullion are suddenly thrust
      into the high-stakes
        world of organized crime.`,
      user: 'admin',
      thumbnailURL:
        'https://e1.pngegg.com/pngimages/142/735/png-clipart-tv-show-icon-84-snatch-thumbnail.png',
    },
  ];

  constructor() {
    //set basemovies as default localStorage Item
    this.setMoviesInLocalStorage();
  }
  setMoviesInLocalStorage() {
    localStorage.setItem('movies', JSON.stringify(this.baseMovies));
  }
  //dashboard first call
  getAllMovies(sortStyle: string, selected: string) {
    //get username from token
    const username = localStorage.getItem('auth-token').slice(13);
    this.moviesToStorage = JSON.parse(localStorage.getItem('movies'));
    console.log('UserName: ' + username);
    //filter movies based on username
    this.moviesToStorage = this.moviesToStorage.filter(
      (movie) => movie.user === username
    );
    //filter movies based on year and rating
    this.moviesToStorage = this.filterMovies(
      this.moviesToStorage,
      sortStyle,
      selected
    );
    //save to localStorage
    localStorage.removeItem('movies');
    localStorage.setItem('movies', JSON.stringify(this.moviesToStorage));

    this.movies = of(this.moviesToStorage);
    return this.movies;
  }
  //add new movie
  addMovie(movie: Movie): Observable<Movie[]> {
    //push to array
    this.moviesToStorage.push(movie);
    //save movie to localstorage
    localStorage.removeItem('movies');
    localStorage.setItem('movies', JSON.stringify(this.moviesToStorage));

    this.movies = of(this.moviesToStorage);
    //return Observable movies array (filtered)
    this.movies = this.getAllMovies('Rate', 'ASC');
    return this.movies;
  }
  //delete sngle movie
  deleteMovie(id: number): Observable<Movie[]> {
    //filter by user
    this.getAllMovies('Year', 'ASC');
    //delete
    this.moviestoDelete = JSON.parse(localStorage.getItem('movies'));
    this.moviestoDelete = this.moviestoDelete.filter(
      (movie) => movie.id !== id
    );
    //baseMovies set
    this.baseMovies = this.moviestoDelete;
    //local storage refresh
    localStorage.removeItem('movies');
    localStorage.setItem('movies', JSON.stringify(this.moviestoDelete));

    return of(this.moviestoDelete);
  }

  //username,year,rating filter func
  filterForUser(
    movies: Observable<Movie[]>,
    sortStyle: string,
    selected: string
  ): Observable<Movie[]> {
    //observable to Movie[]
    movies.subscribe((data) => (this.moviesToStorage = data));
    //filter ASC and DESC based on year or rating
    this.moviesToStorage = this.filterMovies(
      this.moviesToStorage,
      sortStyle,
      selected
    );
    this.movies = of(this.moviesToStorage);
    localStorage.removeItem('movies');
    localStorage.setItem('movies', JSON.stringify(this.moviesToStorage));
    return this.movies;
  }

  //filter DESC&ASC by rate and year
  filterMovies(movies: Movie[], sortStyle: string, selected: string): Movie[] {
    /*  console.log('filterMovies: ' + JSON.stringify(movies)); */
    if (sortStyle === 'Year') {
      if (selected === 'DESC') {
        movies = movies.sort((current, next) => {
          if (current.year > next.year) {
            return -1;
          }
          if (current.year < next.year) {
            return 1;
          }
        });
      }
      if (selected === 'ASC') {
        movies = movies.sort((current, next) => {
          if (current.year > next.year) {
            return 1;
          }
          if (current.year < next.year) {
            return -1;
          }
        });
      }
    }
    if (sortStyle === 'Rate') {
      if (selected === 'DESC') {
        movies = movies.sort((current, next) => {
          if (current.rate > next.rate) {
            return -1;
          }
          if (current.rate < next.rate) {
            return 1;
          }
        });
      }
      if (selected === 'ASC') {
        movies = movies.sort((current, next) => {
          if (current.rate > next.rate) {
            return 1;
          }
          if (current.rate < next.rate) {
            return -1;
          }
        });
      }
    }
    return movies;
  }
}
