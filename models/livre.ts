export class Livre {
  imgUrl: string;
  title: string;

  constructor(data: { imgUrl: string; title: string }) {
    this.imgUrl = data.imgUrl;
    this.title = data.title;
  }
}
