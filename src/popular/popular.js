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

      setTimeout(() => {
        this.projects = results;
        this.searchingPopular = false;
        return this.projects;
      }, 10);
    });

    this.searchingFeatured = true;
    this.dataContext.findByIds(this.fp).then(resp => {
      if (resp) {
        let rsp = this.sortByFeaturedIds(resp, this.fp);
        let b = 4;
        if (rsp.length < b) {
          b = rsp.length - 1;
        }
        if (this.fakeData) {
          rsp.splice(b, 0, this.fakeData);
        }
        this.featured = rsp;
        this.searchingFeatured = false;
      }
    });

    this.dataContext.findHealthiest().then((results) => {
      // Injecting project_description and organizationUrl.
      if (results && results.length > 0) {
        this.searchingHealthiest = true;
        // removing invalid elements
        let filterRes = results.filter((x => { return x && x.id }));
        let mapIds = filterRes.map((x) => x.id);
        if (mapIds && mapIds.length > 0) {
          this.dataContext.findByIds(mapIds).then((resp) => {
            if (resp) {
              filterRes.forEach((element) => {
                let proj = resp.find(x => x.id === element.id);
                if (proj) {
                  element.project_description = proj.project_description;
                  element.organizationUrl = proj.organizationUrl;
                  element.content = proj.content;
                  element.badges = proj.badges;
                  element.sonarlink = `${this.stageConfig.SONARQUBE_ADDRESS}/dashboard/index/${proj.organization}_${proj.project_name}`;
                  this.healthiest.push(element);
                }
              });
            }
            this.searchingHealthiest = false;
          });
        }
      }
    });
  }

  sortByFeaturedIds(data, fp) {
    let result = [];
    fp.forEach((key) => {
      let found = false;
      data.filter((item) => {
          if(!found && item.id == key) {
              result.push(item);
              found = true;
              return false;
          } else
              return true;
      })
    })
    return result;
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

  openLeavingSiteConfirmation(name, url, target) {
    this.exitDialogLinkId = target.getAttribute('id');
    const mdl = { name, url };
    this.dialogService.open({ viewModel: LeavingModal, model: mdl, lock: false }).whenClosed(response => {
      const element = document.querySelector('#' + this.exitDialogLinkId);
      if (element) {
        element.focus();
      }
    });
  }

  displayVScanDialog(repo, target) {
    this.exitDialogLinkId = target.getAttribute('id');
    this.dialogService.open({ viewModel: VScanModal, model: repo, lock: false }).whenClosed(reponse => {
      const element = document.querySelector('#' + this.exitDialogLinkId);
      if (element) {
        element.focus();
      }
    });
  }
}
