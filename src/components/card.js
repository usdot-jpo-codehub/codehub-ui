export class Card {
  constructor() {
    this.repo = [];
    this.downloads = 0;
    this.releases = [];
  }

  activate(modelData) {
    this.releases = modelData.releases;
    if (this.releases === undefined) {
      this.releases = [];
    }

    this.releases.forEach(element => {
      this.downloads += element.total_downloads;
    });

    this.repo = modelData;
  }

}
