import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DataContext } from 'services/datacontext';
import { StageConfig } from '../../stageConf';

@inject(DataContext, Router, StageConfig)
export class Popular {

  constructor(dataContext, router, stageConfig) {
    this.dataContext = dataContext;
    this.router = router;
    this.stageConfig = stageConfig;
    this.fp = stageConfig.FEATURED_PROJECTS;

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
  }

  getData() {
    this.dataContext.findPopular().then(results => {
      setTimeout(() => {
        this.projects = results;
        return this.projects;
      }, 10);
    });

    for (let i = 0; i < this.fp.length; i++) {
      this.dataContext.findById(this.fp[i]).then(repo => {
        this.featured.push(repo);
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

}
