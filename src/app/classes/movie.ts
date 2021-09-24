export class Movie {
  id: number;
  title: string;
  year: number;
  rate: number;
  description: string;
  thumbnailURL: string;
  user: string;
  constructor(id, title, year, rate, user, description, thumbnailURL) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.rate = rate;
    this.user = user;
    this.description = description;
    this.thumbnailURL = thumbnailURL;
  }
}
