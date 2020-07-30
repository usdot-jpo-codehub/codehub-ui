import { inject } from 'aurelia-framework';
import { activationStrategy } from 'aurelia-router';
import { DataContext } from 'services/datacontext';
import StageConfig from '../../stageConf';

@inject(DataContext, StageConfig)
export class ProjectDetailsHeader {

  constructor(dataContext, stageConfig) {
    this.dataContext = dataContext;
    this.stageConfig = stageConfig;

    this.repo = {};
    this.exitDialogLinkId = null
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
