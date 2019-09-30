export class CardSearch {
  constructor() {
    this.repo = [];
    this.downloads = 0;
    this.releases = [];
    this.infected_files = 0;
    this.language_image = '/img/language-icons/default.svg';
  }

  activate(modelData) {
    if (modelData) {
      this.repo = modelData;

      if(this.repo.language) {
        let url = `/img/language-icons/${this.repo.language.toLowerCase()}.svg`;
        url = url.replace(/\#/g,'_sharp');
        this.validateImage(url, (isValid) => {
          this.language_image = isValid ? url : this.language_image;
        });
      }

      if (modelData.releases) {
        this.releases = modelData.releases;
        if (!Array.isArray(modelData.releases)) {
          this.releases = [];
          this.repo.releases = [];
        }
      }
      if (modelData.vscan && modelData.vscan.infected_files) {
        this.infected_files = modelData.vscan.infected_files;
      }
    }

    this.releases.forEach(element => {
      this.downloads += (element.total_downloads && element.total_downloads !== undefined) ? element.total_downloads : 0;
    });
  }

  validateImage(url, cbfx) {
    let img = new Image()
    img.onload = () => cbfx(true);
    img.onerror = () => cbfx(false);
    img.src = url;
  }

}
