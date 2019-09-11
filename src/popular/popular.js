import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import { DataContext } from 'services/datacontext';
import { StageConfig } from '../../stageConf';
import { ReadmeModal } from '../components/modals/readme-modal';
import { LeavingModal } from '../components/modals/leaving-modal';
//import json data fake file nickname here. 
//google how to import json file

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
    this.dataContext.findPopular().then(results => {
      setTimeout(() => {
        this.projects = results;
        return this.projects;
      }, 10);
    });
    //inject fake data here at position 4
    //need to syncronise these two: API & this array repo, then insert
    // for (let i = 0; i < this.fp.length; i++) {
    //   this.dataContext.findById(this.fp[i]).then(repo => {
    //     this.featured.push(repo);

    //   });
    // }
    //Gio:slack_call: 12:45 PM
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
         //insert into 'feat' variable into position 4 the fake data (needs a 'name')
         //insert json object. create variable for json oject, add variable "isFake = true;"
         let fakeData = {
              isFake :true, 
              project_name: "Your repository name here!",
              language: "Primary Language Here",
              project_description: "Contribute to the advancement of U.S. Transportation!",
              organization: "your username",
              updatedAt: "Future Updates Pending",
              stars: "?",
              watchers: "?",
              releases: "?",
              forkedRepos: "?",
              contributors: "?",
              commits: "?"
      }; //could put project_name
         //let fakeData = fakeDatafilename.json;
         let b = 4;
         if(feat.length < b)
         {
           b=feat.length - 1;
         }
          feat.splice(b, 0, fakeData);
         
         this.featured = [...feat];
         this.searchingFeatured = false;
         console.log(this.featured);
       }
     });
   }

    this.dataContext.findHealthiest().then((results) => {
      // Injecting project_description and organizationUrl.
      if (results && results.length > 0) {
        results.forEach((element) => {
          if (element && element.id) {
            this.dataContext.findById(element.id).then(proj => {
              if (proj) {
                element.project_description = proj.project_description;
                element.organizationUrl = proj.organizationUrl;
                element.content = proj.content;
                element.sonarlink = `${this.stageConfig.SONARQUBE_ADDRESS}/dashboard/index/${proj.organization}_${proj.project_name}`;
                this.healthiest.push(element);
              }
            });
          }
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

}
