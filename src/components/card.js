export class Card {
  constructor() {
    this.repo = [];
    this.downloads = 0;
    this.releases = [];
  }

  activate(modelData) {
    if (modelData && modelData !== undefined) {
      this.repo = modelData;

      if (modelData.releases && modelData.releases !== undefined) {
        this.releases = modelData.releases;
        if (!Array.isArray(modelData.releases)) {
          this.releases = [];
          this.repo.releases = [];
        }
      }
    }

    this.releases.forEach(element => {
      this.downloads += (element.total_downloads && element.total_downloads !== undefined) ? element.total_downloads : 0;
    });
  }

}
