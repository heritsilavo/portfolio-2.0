export class Livre {
  imgUrl: string;
  title: string;
  type: "LIVRE" | "PROPOSER";

  constructor(data: { imgUrl: string; title: string, type: "LIVRE" | "PROPOSER"}) {
    this.imgUrl = data.imgUrl;
    this.title = data.title;
    this.type = data.type;
  }
}
