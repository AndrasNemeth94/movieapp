import { Component } from '@angular/core';

//interfaces
import { IUser, IMovie } from './interfaces/export-interfaces';

//services
import { AuthService } from './services/auth.service';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  users: IUser[] = [
    {
      id: 1,
      firstName: 'Sara',
      lastName: 'Walters',
      email: 'sara@gmail.com',
      password: 'Walters?1',
    },
    {
      id: 2,
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@gmail.com',
      password: 'Asd123??',
    },
  ];

  movies: IMovie[] = [
    {
      id: 1,
      title: 'F&F2',
      year: 2003,
      rate: 5.9,
      description: `EX LAPD cop Brian O'Conner (Paul Walker) teams up with his ex-con friend Roman Pearce (Tyrese Gibson)
         Sand works with undercover U.S. Customs Service agent Monica Fuentes (Eva Mendes)
         to bring Miami-based drug lord Carter Verone (Cole Hauser) down.`,
      user: 'András',
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
      user: 'András',
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
      user: 'András',
      thumbnailURL:
        'https://e1.pngegg.com/pngimages/142/735/png-clipart-tv-show-icon-84-snatch-thumbnail.png',
    },
  ];

  constructor(
    private authService: AuthService,
    private movieService: MoviesService
  ) {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
