import { inject, computedFrom } from 'aurelia-framework';
import CHContants from '../constants/ch-constants';
import StageConfig from '../stageConf';
import { DialogFunctions } from '../resources/shared/dialog-functions';


@inject(StageConfig, DialogFunctions)
export class Card {
  constructor(stageConfig, dialogFunctions) {
    this.repo = {};
    this.showFeatured = false;
    this.downloads = 0;
    this.releases = [];
    this.infected_files = 0;
    this.stageConfig = stageConfig;
    this.badge_status_image = '/img/pending_review_final_29w_35h.svg';
    this.metricsText = 'Metrics...';
    this.showMetrics = false;
    this.dialogFunctions = dialogFunctions;
  }

  activate(modelData) {
    if (modelData) {
      this.repo = modelData.data;
      if (this.repo) {
        this.showFeatured = modelData.showFeatured ? modelData.showFeatured : false;
        this.showMetrics = modelData.showMetrics ? modelData.showMetrics : false;

        if (this.repo.sourceData && this.repo.sourceData.releases) {
          this.releases = this.repo.sourceData.releases;
        }

        if (this.repo.generatedData && this.repo.generatedData.vscan && this.repo.generatedData.vscan.infected_files) {
          this.infected_files = this.repo.generatedData.vscan.infected_files;
        }

        if (this.repo.codehubData && this.repo.codehubData.badges && this.repo.codehubData.badges.status) {
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

    this.releases.forEach(element => {
      this.downloads += (element.total_downloads && element.total_downloads !== undefined) ? element.total_downloads : 0;
    });
  }

  @computedFrom('repo.project_description')
  get hasdescription() {
    return this.repo && this.repo.sourceData && this.repo.sourceData.description ? true : false;
  }
  get description() {
    return this.repo && this.repo.sourceData && this.repo.sourceData.description  ? this.repo.sourceData.description : CHContants.NO_DESCRIPTION_MESSAGE;
  }
  get language() {
    return this.repo && this.repo.sourceData && this.repo.sourceData.language ? this.repo.sourceData.language : this.stageConfig.NO_LANG
  }

  @computedFrom('repo.sourceData.language')
  get language_image() {
    let image = '/img/language-icons/default.svg';
    if(this.repo && this.repo.sourceData && this.repo.sourceData.language) {
      let url = `/img/language-icons/${this.repo.sourceData.language.toLowerCase()}.svg`;
      url = url.replace(/\#/g,'_sharp');
      return url;
    }
    return image;
  }

  validateImage(url, cbfx) {
    let img = new Image()
    img.onload = () => cbfx(true);
    img.onerror = () => cbfx(false);
    img.src = url;
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
