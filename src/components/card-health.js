import { inject, computedFrom } from 'aurelia-framework';
import { NO_DESCRIPTION_MESSAGE } from '../constants/ch-contants';
import { StageConfig } from '../stageConf';

@inject(StageConfig)
export class Card {
  constructor(stageConfig) {
    this.repo = [];
    this.bugs = 0;
    this.vulnerabilities = 0;
    this.infected_files = 0;
    this.language_image = '/img/language-icons/default.svg';
    this.stageConfig = stageConfig;
    this.badge_status_image = '/img/pending_review_final_29w_35h.svg';
  }

  activate(modelData) {
    this.repo = modelData;

    if (this.repo) {
      if(this.repo.language) {
        let url = `/img/language-icons/${this.repo.language.toLowerCase()}.svg`;
        url = url.replace(/\#/g,'_sharp');
        this.validateImage(url, (isValid) => {
          this.language_image = isValid ? url : this.language_image;
        });
      }

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

      if (this.repo.badges && this.repo.badges.status) {
        switch(this.repo.badges.status.toLowerCase()) {
          case 'active':
            this.badge_status_image = '/img/active_flame_final_28w_35h.svg';
            break;
          case 'inactive':
            this.badge_status_image = '/img/inactive_zzz_final_32w_35h.svg';
            break;
          case 'pending':
              this.badge_status_image = '/img/pending_review_final_29w_35h.svg';
              break;
          case 'read-only':
              this.badge_status_image = '/img/lock_final_28w_35h.svg';
              break;
          default:
            this.badge_status_image = '/img/pending_review_final_29w_35h.svg';
        }
      }
    }
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
