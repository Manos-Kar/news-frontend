export class News {
  title: string;
  date: string;
  content: string;
  image: string;
  favourite: boolean;
  genre: string[];
  origin: string;
  link: string;
  id: string;

  constructor(
    title: string,
    date: string,
    content: string,
    image: string,
    favourite: boolean,
    genre: string[],
    origin: string,
    link: string,
    id: string
  ) {
    this.title = title;
    this.date = date;
    this.content = content;
    this.image = image;
    this.favourite = favourite;
    this.genre = genre;
    this.origin = origin;
    this.link = link;
    this.id = id;
  }
}
