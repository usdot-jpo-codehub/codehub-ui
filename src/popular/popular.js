import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import { DataContext } from 'services/datacontext';
import { StageConfig } from '../../stageConf';
import { ReadmeModal } from '../components/modals/readme-modal';
import { LeavingModal } from '../components/modals/leaving-modal';
import { VScanModal } from '../components/modals/vscan-modal';

@inject(DataContext, Router, StageConfig, DialogService)
export class Popular {

  constructor(dataContext, router, stageConfig, dialogService) {
    this.dataContext = dataContext;
    this.router = router;
    this.stageConfig = stageConfig;
    this.fp = stageConfig.FEATURED_PROJECTS;
    this.dialogService = dialogService;

    this.projects = [];
    this.featured = [];
    this.healthiest = [];

    this.projectTitle = 'Most Popular Projects';

    this.landing = true;
    this.searchingPopular = false;
    this.searchingFeatured = false;
    this.searchingHealthiest = false;

    this.sortDirection = 'descending';
    this.selectedSort = 'rank';
    this.sortOptions = [
      { value: 'rank', name: 'Rank' },
      { value: 'stars', name: 'Stars' },
      { value: 'watchers', name: 'Watchers' },
      { value: 'releases', name: 'Releases' },
      { value: 'commits', name: 'Commits' },
      { value: 'contributors', name: 'Contributors' },
    ];
    this.openReadmeLinkId = null;
    this.exitDialogLinkId = null;
  }

  getData() {
    this.searchingPopular = true;
    this.dataContext.findPopular().then(results => {
      if(!results) {
        this.searchingPopular = false;
        return this.projects;
      }

      setTimeout(() => {
        this.projects = results;
        this.searchingPopular = false;
        return this.projects;
      }, 10);
    });

    let c = 0;
    let feat = [];
    this.searchingFeatured = true;
    for (let i = 0; i < this.fp.length; i++) {
      this.dataContext.findById(this.fp[i]).then(repo => {
        c++;
        if(repo) {
          feat.push(repo);
        }
        if (c >= this.fp.length) {
          this.featured = [...feat];
          this.searchingFeatured = false;
        }
      });
    }


    this.dataContext.findHealthiest().then((results) => {
      // Injecting project_description and organizationUrl.
      if (results && results.length > 0) {
        this.searchingHealthiest = true;
        // removing invalid elements
        let filterRes = results.filter((x => {return x && x.id}));
        let c=0;
        let data = [];
        filterRes.forEach((element) => {
          this.dataContext.findById(element.id).then(proj => {
            c++;
            if (proj) {
              element.project_description = proj.project_description;
              element.organizationUrl = proj.organizationUrl;
              element.content = proj.content;
              element.sonarlink = `${this.stageConfig.SONARQUBE_ADDRESS}/dashboard/index/${proj.organization}_${proj.project_name}`;
              data.push(element);
            }

            if (c >= filterRes.length) {
              this.healthiest = [...data];
              this.searchingHealthiest = false;
            }
          });
        });
      }
    });
  }

  activate() {
    this.getData();
  }

  openReadmeModal(repo, target) {
    this.openReadmeLinkId = target.getAttribute('id');
    this.dialogService.open({ viewModel: ReadmeModal, model: repo, lock: false }).whenClosed(response => {
      if (response.wasCancelled) {
        const element = document.querySelector('#'+this.openReadmeLinkId);
        element.focus();
      }
    });
  }

  openLeavingSiteConfirmation(name, url, target) {
    this.exitDialogLinkId = target.getAttribute('id');
    const mdl = { name, url };
    this.dialogService.open({ viewModel: LeavingModal, model: mdl, lock: false }).whenClosed( response => {
      const element = document.querySelector('#'+this.exitDialogLinkId);
      if(element) {
        element.focus();
      }
    });
  }

  displayVScanDialog(repo, target) {
    this.exitDialogLinkId = target.getAttribute('id');
    this.dialogService.open({viewModel: VScanModal, model: repo, lock: false}).whenClosed( reponse => {
      const element = document.querySelector('#'+this.exitDialogLinkId);
      if(element) {
        element.focus();
      }
    });
  }
}
