export class Card {
  constructor() {
    this.repo = [];
    this.bugs = 0;
    this.vulnerabilities = 0;
  }

  activate(modelData) {
    this.repo = modelData;
    if (this.repo !== undefined) {
      if (this.repo.metrics) {
        if (this.repo.metrics.bugs) {
          this.bugs = Number(this.repo.metrics.bugs.val);
        }
        if (this.repo.metrics.vulnerabilities) {
          this.vulnerabilities = Number(this.repo.metrics.vulnerabilities.val);
        }
      }
    }
  }

}
