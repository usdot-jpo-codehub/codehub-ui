export class Card {
  constructor() {
    this.repo = [];
    this.bugs = 0;
    this.vulnerabilities = 0;
    this.infected_files = 0;
    this.language_image = '/img/language-icons/default.svg';
  }

  activate(modelData) {
    this.repo = modelData;

    if(this.repo.language) {
      let url = `/img/language-icons/${this.repo.language.toLowerCase()}.svg`;
      url = url.replace(/\#/g,'_sharp');
      this.validateImage(url, (isValid) => {
        this.language_image = isValid ? url : this.language_image;
      });
    }

    if (this.repo !== undefined) {
      if (this.repo.metrics) {
        if (this.repo.metrics.bugs) {
          this.bugs = Number(this.repo.metrics.bugs.val);
        }
        if (this.repo.metrics.vulnerabilities) {
          this.vulnerabilities = Number(this.repo.metrics.vulnerabilities.val);
        }
      }

      if(this.repo.vscan && this.repo.vscan.infected_files) {
        this.infected_files = this.repo.vscan.infected_files;
      }
    }
  }

  validateImage(url, cbfx) {
    let img = new Image()
    img.onload = () => cbfx(true);
    img.onerror = () => cbfx(false);
    img.src = url;
  }
}
