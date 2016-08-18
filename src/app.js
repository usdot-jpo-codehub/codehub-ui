import { DialogService } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
import { Modal } from './modal/modal';

@inject(DialogService)

export class App {
  configureRouter(config, router) {
    config.title = 'Stage';
    config.options.pushState = false;
    config.map([
      { route: '', name: 'project', moduleId: 'popular/list', nav: true, title: 'Popular' },
      { route: 'projects', name: 'projects', moduleId: 'explore/explore', nav: true, title: 'Explore' },
      { route: 'favorites', name: 'favorites', moduleId: 'favorites/list-favorites', nav: true, title: 'Favorites' },
      { route: 'result', name: 'result', moduleId: 'results/result', nav: false, settings: 'data' },
      { route: 'project-details', name: 'project-details', moduleId: 'project-details/project-details', nav: false, title: 'project-details' },
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
