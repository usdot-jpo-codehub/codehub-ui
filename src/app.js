import { DialogService } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
import { FeedbackModal } from 'components/modals/feedback-modal.js';
import { LeavingModal } from 'components/modals/leaving-modal.js';
import { StageConfig } from './stageConf';
import 'bootstrap';

@inject(DialogService, StageConfig)
export class App {
  configureRouter(config, router) {
    config.title = 'ITS CodeHub';
    config.options.pushState = false;
    config.map([
      { route: '', name: 'popular', viewPorts: { mainContent: { moduleId: 'popular/popular' }, headerContent: { moduleId: 'search/search-bar' } }, nav: true, title: 'Home' },
      { route: 'about', name: 'about', viewPorts: { mainContent: {moduleId: 'about/about' }, headerContent: { moduleId: 'components/headers/generic-title' } }, nav: true, title: 'About', settings: { desc: 'About ITS CodeHub' } },
      { route: 'explore', name: 'explore', viewPorts: { mainContent: { moduleId: 'explore/explore' }, headerContent: { moduleId: 'components/headers/generic-title' } }, nav: true, title: 'Explore', settings: { desc: 'Browse 100s of projects and discover your InnerSource' } },
      { route: 'insight', name: 'insight', viewPorts: { mainContent: { moduleId: 'insight/insight' }, headerContent: { moduleId: 'components/headers/insight-title' } }, nav: true, title: 'Insight', settings: { desc: 'Software Oriented Data Analysis (SODA)', altTitle: 'Enterprise Insight' } },
      { route: 'results', name: 'results', viewPorts: { mainContent: { moduleId: 'search/results' }, headerContent: { moduleId: 'search/search-bar-secondary' } }, nav: false, title: 'Search Results' },
      { route: 'project-details', name: 'project-details', viewPorts: { mainContent: { moduleId: 'project-details/project-details' }, headerContent: { moduleId: 'components/headers/project-details-header' } }, nav: false, title: 'Project Details' },
      { route: 'profile', name: 'profile', viewPorts: { mainContent: { moduleId: 'profile/profile' }, headerContent: { moduleId: 'components/headers/secondary-title' } }, nav: false, title: 'Your Account', settings: { desc: 'View and manage your account settings' } },
    ]);
    this.router = router;
  }

  constructor(dialogService, stageConfig) {
    this.dialogService = dialogService;
    this.stageConfig = stageConfig;
    this.exitDialogLinkId = null;
  }

  activate() {
    setTimeout(()=>{
      const alertMessage = document.querySelector ('#message-alert-button');
      if(alertMessage) {
        alertMessage.focus();
      } else {
        const homeLink = document.querySelector('#router-menu-Home');
        if(homeLink){
          homeLink.focus(); 
        }
      }
    },500);
  }

  openFeedbackModal() {
    this.dialogService.open({ viewModel: FeedbackModal, lock:false });
  }

  openLeavingSiteConfirmation(name, url, target) {
    this.exitDialogLinkId = target.getAttribute('id');
    const mdl = { name, url };
    this.dialogService.open({ viewModel: LeavingModal, model: mdl, lock:false }).whenClosed( response => {
      const element = document.querySelector('#'+this.exitDialogLinkId);
      if(element) {
        element.focus();
      }
    });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
