import { DialogService } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
import { Modal } from './components/modal';

@inject(DialogService)
export class App {
  configureRouter(config, router) {
    config.title = 'Stage';
    config.options.pushState = false;
    config.map([
      { route: '', name: 'popular', viewPorts: { mainContent: { moduleId: 'popular/popular' }, headerContent: { moduleId: 'search/search-bar' } }, nav: true, title: 'Popular' },
      { route: 'explore', name: 'explore', viewPorts: { mainContent: { moduleId: 'explore/explore' }, headerContent: { moduleId: 'search/search-bar-secondary' } }, nav: true, title: 'Explore' },
      { route: 'favorites', name: 'favorites', viewPorts: { mainContent: { moduleId: 'favorites/favorites' }, headerContent: { moduleId: 'search/search-bar-secondary' } }, nav: true, title: 'Bookmarks' },
      { route: 'favorites', name: 'favorites', viewPorts: { mainContent: { moduleId: 'favorites/favorites' }, headerContent: { moduleId: 'search/search-bar-secondary' } }, nav: true, title: 'Insights' },
      { route: 'results', name: 'results', viewPorts: { mainContent: { moduleId: 'search/results' }, headerContent: { moduleId: 'search/search-bar-secondary' } }, nav: false, title: 'Search Results' },
      { route: 'project-details', name: 'project-details', viewPorts: { mainContent: { moduleId: 'project-details/project-details-secondary' }, headerContent: { moduleId: 'search/search-bar' } }, nav: false, title: 'Project Details' },
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
