export class Card {
  constructor() {
    this.repo = [];
    this.downloads = 0;
    this.releases = [];
    this.metricsText = 'Metrics...';
    this.showMetrics = false;
  }

  activate(modelData) {
    if (modelData) {
      this.repo = modelData;
      if (modelData.releases) {
        this.releases = modelData.releases;
        if (!Array.isArray(modelData.releases)) {
          this.releases = [];
          this.repo.releases = [];
        }
      }
    }

    this.releases.forEach(element => {
      this.downloads += (element.total_downloads && element.total_downloads != undefined) ? element.total_downloads : 0;
    });
  }

  showHideMetrics() {
    this.showMetrics = !this.showMetrics;
    if (this.showMetrics) {
      this.metricsText = 'Hide metrics...';
    } else {
      this.metricsText = 'Metrics...';
    }
  }

}
