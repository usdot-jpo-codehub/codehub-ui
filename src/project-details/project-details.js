import { inject, computedFrom } from 'aurelia-framework';
import { Router, activationStrategy } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import { DataContext } from 'services/datacontext';
import { AddProjectsModal } from 'components/modals/addprojects-modal.js';
import { ReadmeModal } from '../components/modals/readme-modal';
import { LeavingModal } from '../components/modals/leaving-modal';
import { ContributorsModal } from '../components/modals/contributors-modal';
import { StageConfig } from '../../stageConf';
import { VScanModal } from '../components/modals/vscan-modal';
import { NO_DESCRIPTION_MESSAGE } from '../constants/ch-contants';

@inject(DataContext, Router, DialogService, StageConfig)
export class ProjectDetails {

  constructor(dataContext, router, dialogService, stageConfig) {
    this.dataContext = dataContext;
    this.dialogService = dialogService;
    this.stageConfig = stageConfig;

    this.repo = {};
    this.repo.contributors_list = [];
    this.similarProjects = [];
    this.componentDependencies = [];
    this.projectsThatUseUs = [];
    this.releases = [];
    this.downloads = 0;
    this.noSonarData = false;

    this.sonarLink = '';

    this.dependCollapsed = true;
    this.useUsCollapsed = true;
    this.numDepends = 8;
    this.exitDialogLinkId = null;
    this.openReadmeLinkId = null;
    this.addProjectLinkId = null;
    this.contributorsLinkid = null;

    this.health = {};

    this.badge_status_image = '/img/pending_review_final_29w_35h.svg';
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  activate(params) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    this.dataContext.findById(params.id).then(repo => {
      if (!repo) {
        return;
      }
      this.repo = repo;
      this.sonarLink = `${this.stageConfig.SONARQUBE_ADDRESS}/dashboard/index/${repo.organization}_${repo.project_name}`;
      if (repo.userForkedRepos) {
        this.projectsThatUseUs = repo.forkedRepos.concat(repo.userForkedRepos);
      } else {
        this.projectsThatUseUs = repo.forkedRepos;
      }

      this.releases = this.repo.releases;
      if (this.releases === undefined || !Array.isArray(this.releases)) {
        this.releases = [];
      }

      this.releases.forEach(r => { this.downloads += r.total_downloads; });

      if (repo.badges && repo.badges.status) {
        switch(repo.badges.status.toLowerCase()) {
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
    });

    this.dataContext.getHealthById(params.id).then(health => {
      if (health && Object.prototype.hasOwnProperty.call(health, 'error')) {
        this.noSonarData = true;
      } else {
        this.noSonarData = health.code_smells === undefined && health.reliability_rating === undefined && health.security_rating === undefined;
      }
      this.health = health;
    });

    this.dataContext.getComponentDependencies(params.id).then(depends => {
      if (depends && depends.componentDependencies) {
        this.componentDependencies = depends.componentDependencies;

        // TODO this fix should be done API side
        let i = depends.componentDependencies.length;
        while (i--) {
          if (this.componentDependencies[i].artifactId === undefined) {
            this.componentDependencies.splice(i, 1);
          }
        }
      }
    });

    this.noDependencies = this.componentDependencies.length === 0 && this.projectsThatUseUs.length === 0;
  }

  @computedFrom('repo.project_description')
  get description() {
    return this.repo.project_description ? this.repo.project_description : NO_DESCRIPTION_MESSAGE;
  }
  get hasdescription() {
    return this.repo.project_description ? true : false;
  }

  

  openAddProjectModal(target) {
    this.addProjectLinkId = target.getAttribute('id');
    this.dialogService.open({ viewModel: AddProjectsModal, model: this.repo, lock: false }).whenClosed(response => {
      if (response && response.wasCancelled) {
        this.dataContext.postUsedProject(response.output, this.repo.id).then(data => {
          this.projectsThatUseUs.push(response.output);
        }).catch((e) => {console.log(e);});
      }
      const element = document.querySelector('#'+this.addProjectLinkId);
      if(element) {
        element.focus();
      }
    });
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

  openContribModal(repo, target) {
    this.contributorsLinkid = target.getAttribute('id');
    this.dialogService.open({ viewModel: ContributorsModal, model: repo, lock:false }).whenClosed( response => {
      const element = document.querySelector('#'+this.contributorsLinkid);
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
