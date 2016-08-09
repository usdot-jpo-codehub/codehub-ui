import { DialogService } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
import { Modal } from './modules/project/modal/modal';

@inject(DialogService)

export class App {
  configureRouter(config, router) {
    config.title = 'Stage';
    config.options.pushState = false;
    config.map([
      { route: '', name: 'project', moduleId: 'modules/project/popular/list', nav: true, title: 'Popular' },
      { route: 'projects', name: 'projects', moduleId: 'modules/project/all-projects/list-all-projects', nav: true, title: 'Explore' },
      { route: 'favorites', name: 'favorites', moduleId: 'modules/project/favorites/list-favorites', nav: true, title: 'Favorites' },
      { route: 'result', name: 'result', moduleId: 'modules/project/results/result', nav: false, settings: 'data' },
      { route: 'project-details', name: 'project-details', moduleId: 'modules/project/project-details/project-details', nav: false, title: 'project-details' },
    ]);
    this.router = router;
  }

  constructor(dialogService) {
    this.dialogService = dialogService;
  }

  openModal(repo) {
    this.dialogService.open({ viewModel: Modal, model: repo });
  }
}
