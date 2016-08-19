import { DialogService } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
import { Modal } from './components/modal';

@inject(DialogService)
export class App {
  configureRouter(config, router) {
    config.title = 'Stage';
    config.options.pushState = false;
    config.map([
      { route: '', name: 'popular', moduleId: 'popular/popular', nav: true, title: 'Popular' },
      { route: 'explore', name: 'explore', moduleId: 'explore/explore', nav: true, title: 'Explore' },
      { route: 'favorites', name: 'favorites', moduleId: 'favorites/favorites', nav: true, title: 'Favorites' },
      { route: 'results', name: 'results', moduleId: 'search/results', nav: false, title: 'Search Results' },
      { route: 'project-details', name: 'project-details', moduleId: 'project-details/project-details', nav: false, title: 'Project Details' },
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
