export class ErrorHandle extends Error {
  constructor(message = "Some Thing Went Wrong") {
    super(message);
    this.name = "Some Thing Went Wrong";
  }
}
