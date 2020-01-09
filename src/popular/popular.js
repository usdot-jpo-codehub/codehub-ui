import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import { DataContext } from 'services/datacontext';
import { StageConfig } from '../../stageConf';
import { ReadmeModal } from '../components/modals/readme-modal';
import { LeavingModal } from '../components/modals/leaving-modal';
import { VScanModal } from '../components/modals/vscan-modal';
import { FakeData } from '../fakeData';

@inject(DataContext, Router, StageConfig, DialogService, FakeData)
export class Popular {

  constructor(dataContext, router, stageConfig, dialogService, fakeData) {
    this.dataContext = dataContext;
    this.router = router;
    this.stageConfig = stageConfig;
    this.fp = stageConfig.FEATURED_PROJECTS;
    this.dialogService = dialogService;
    this.fakeData = fakeData;

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
      if (!results) {
        this.searchingPopular = false;
        return this.projects;
      }
      this.projects = results;
      this.searchingPopular = false;
    });

    this.searchingFeatured = true;
    this.dataContext.findFeatured().then((results) => {
      if(!results) {
        this.searchingFeatured = false;
        return this.featured;
      }
      this.featured = results;
      this.searchingFeatured = false;
    });

    this.searchingHealthiest = true;
    this.dataContext.findHealthiest().then((results) => {
      if(!results) {
        this.searchingHealthiest = false;
        return this.healthiest;
      }
      this.healthiest = results;
      this.searchingHealthiest = false;
    });
  }

  activate() {
    this.getData();
  }

  openReadmeModal(repo, target) {
    this.openReadmeLinkId = target.getAttribute('id');
    this.dialogService.open({ viewModel: ReadmeModal, model: repo, lock: false }).whenClosed(response => {
      if (response.wasCancelled) {
        const element = document.querySelector('#' + this.openReadmeLinkId);
        element.focus();
      }
    });
  }

  openLeavingSiteConfirmation(name, url, target, bypass) {
    this.exitDialogLinkId = target.getAttribute('id');
    let byp = bypass === undefined ? false : bypass;
    if(byp) {
      const win = window.open(url, '_blank');
      win.focus();
    } else {
      const mdl = { name, url };
      this.dialogService.open({ viewModel: LeavingModal, model: mdl, lock: false }).whenClosed( response => {
        const element = document.querySelector('#'+this.exitDialogLinkId);
        if(element) {
          element.focus();
        }
      });
    }
  }

  displayVScanDialog(repo, target) {
    this.exitDialogLinkId = target.getAttribute('id');
    this.dialogService.open({ viewModel: VScanModal, model: repo, lock: false }).whenClosed(response => {
      const element = document.querySelector('#' + this.exitDialogLinkId);
      if (element) {
        element.focus();
      }
    });
  }
}
