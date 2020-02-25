import { inject, computedFrom } from 'aurelia-framework';
import { NO_DESCRIPTION_MESSAGE } from '../constants/ch-constants';
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
      if(this.repo.sourceData.language) {
        let url = `/img/language-icons/${this.repo.sourceData.language.toLowerCase()}.svg`;
        url = url.replace(/\#/g,'_sharp');
        this.validateImage(url, (isValid) => {
          this.language_image = isValid ? url : this.language_image;
        });
      }

      if (this.repo.generatedData.sonarMetrics) {
        if (this.repo.generatedData.sonarMetrics.bugs) {
          this.bugs = Number(this.repo.generatedData.sonarMetrics.bugs.val);
        }
        if (this.repo.generatedData.sonarMetrics.vulnerabilities) {
          this.vulnerabilities = Number(this.repo.generatedData.sonarMetrics.vulnerabilities.val);
        }
      }

      if(this.repo.generatedData.vscan && this.repo.generatedData.vscan.infected_files) {
        this.infected_files = this.repo.generatedData.vscan.infected_files;
      }

      if (this.repo.codehubData.badges && this.repo.codehubData.badges.status) {
        switch(this.repo.codehubData.badges.status.toLowerCase()) {
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
    return this.repo.sourceData.description ? true : false;
  }
  get description() {
    return this.repo.sourceData.description  ? this.repo.sourceData.description : NO_DESCRIPTION_MESSAGE;
  }
  get language() {
    return this.repo.sourceData.language ? this.repo.sourceData.language : this.stageConfig.NO_LANG
  }

  validateImage(url, cbfx) {
    let img = new Image()
    img.onload = () => cbfx(true);
    img.onerror = () => cbfx(false);
    img.src = url;
  }
}
