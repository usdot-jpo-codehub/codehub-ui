import { inject, computedFrom } from 'aurelia-framework';
import { NO_DESCRIPTION_MESSAGE } from '../constants/ch-contants';
import { StageConfig } from '../stageConf';

@inject(StageConfig)
export class Card {
  constructor(stageConfig) {
    this.repo = [];
    this.downloads = 0;
    this.releases = [];
    this.infected_files = 0;
    this.language_image = '/img/language-icons/default.svg';
    this.stageConfig = stageConfig;
    this.badge_status_image = null;
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

      if (modelData.badges && modelData.badges.status) {
        switch(modelData.badges.status.toLowerCase()) {
          case 'active':
            this.badge_status_image = '/img/active_flame_final_28w_35h.svg';
            break;
          case 'inactive':
            this.badge_status_image = '/img/inactive_zzz_final_32w_35h.svg';
            break;
          default:
            this.badge_status_image = null;
        }
      }
    }

    this.releases.forEach(element => {
      this.downloads += (element.total_downloads && element.total_downloads !== undefined) ? element.total_downloads : 0;
    });
  }


  @computedFrom('repo.project_description')
  get hasdescription() {
    return this.repo.project_description ? true : false;
  }
  get description() {
    return this.repo.project_description  ? this.repo.project_description : NO_DESCRIPTION_MESSAGE;
  }
  get language() {
    return this.repo.language ? this.repo.language : this.stageConfig.NO_LANG
  }

  validateImage(url, cbfx) {
    let img = new Image()
    img.onload = () => cbfx(true);
    img.onerror = () => cbfx(false);
    img.src = url;
  }
}
