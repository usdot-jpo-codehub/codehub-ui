import { DialogService } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
import { Modal } from './components/modal';
import { StageConfig } from '../stageConf';

@inject(DialogService, StageConfig)
export class App {
  configureRouter(config, router) {
    config.title = 'Stage';
    config.options.pushState = false;
    config.map([
      { route: '', name: 'popular', viewPorts: { mainContent: { moduleId: 'popular/popular' }, headerContent: { moduleId: 'search/search-bar' } }, nav: true, title: 'Home' },
      { route: 'explore', name: 'explore', viewPorts: { mainContent: { moduleId: 'explore/explore' }, headerContent: { moduleId: 'components/headers/explore-title-secondary' } }, nav: true, title: 'Explore' },
      { route: 'favorites', name: 'favorites', viewPorts: { mainContent: { moduleId: 'favorites/favorites' }, headerContent: { moduleId: 'components/headers/insights-title-secondary' } }, nav: true, title: 'Insight' },
      { route: 'results', name: 'results', viewPorts: { mainContent: { moduleId: 'search/results' }, headerContent: { moduleId: 'search/search-bar-secondary' } }, nav: false, title: 'Search Results' },
      { route: 'project-details', name: 'project-details', viewPorts: { mainContent: { moduleId: 'project-details/project-details' }, headerContent: { moduleId: 'search/search-bar-secondary' } }, nav: false, title: 'Project Details' },
    ]);
    this.router = router;
  }

  constructor(dialogService) {
    this.dialogService = dialogService;
    this.stageConfig = StageConfig;
  }

  openModal(repo) {
    this.dialogService.open({ viewModel: Modal, model: repo });
  }
}
