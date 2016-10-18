import { inject } from 'aurelia-framework';
import { activationStrategy } from 'aurelia-router';
import { DataContext } from 'services/datacontext';

@inject(DataContext)
export class ProjectDetailsHeader {

  constructor(dataContext) {
    this.dataContext = dataContext;

    this.repo = {};

    // TODO Have some sort of loading text or loading animation while dataContext loads
    // this.repo.project_name = 'Loading...';
    // this.repo.language = 'Loading...';
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  activate(params) {
    this.dataContext.findById(params.id).then(repo => {
      this.repo = repo;
    });
  }

}
