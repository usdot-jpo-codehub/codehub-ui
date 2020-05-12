import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { StageConfig } from './stageConf';
import 'bootstrap';
import environment from './environment';
import 'uswds';

@inject(StageConfig, environment)
export class App {
  configureRouter(config, router) {
    config.title = 'ITS CodeHub';
    config.options.pushState = false;
    config.map([
      { route: '', name: 'popular', viewPorts: { mainContent: { moduleId: 'popular/popular' }, headerContent: { moduleId: 'search/search-bar' } }, nav: true, title: 'Home', settings: { desc: '', isTopLevelMenu_noChildren: true}},
      { route: 'about', name: 'about', viewPorts: { mainContent: {moduleId: 'about/about' }, headerContent: { moduleId: 'components/headers/generic-title' } }, nav: true, title: 'About', settings: { desc: '', isTopLevelMenu_noChildren: true} },
      { route: 'explore', name: 'explore', viewPorts: { mainContent: { moduleId: 'explore/explore' }, headerContent: { moduleId: 'components/headers/generic-title' } }, nav: true, title: 'Explore', settings: { desc: '',isTopLevelMenu_noChildren: true} },
      { route: 'results', name: 'results', viewPorts: { mainContent: { moduleId: 'search/results' }, headerContent: { moduleId: 'search/search-bar-secondary' } }, nav: false, title: 'Search Results' },
      { route: 'project-details', name: 'project-details', viewPorts: { mainContent: { moduleId: 'project-details/project-details' }, headerContent: { moduleId: 'components/headers/project-details-header' } }, nav: false, title: 'Project Details', settings: { desc: '', isTopLevelMenu_noChildren: true }},
      { route: 'profile', name: 'profile', viewPorts: { mainContent: { moduleId: 'profile/profile' },headerContent: { moduleId: 'components/headers/generic-title'} }, nav: false, title: 'Your Account', settings: { desc: '', isTopLevelMenu_noChildren: true }},
      { route: 'repopublishing', name: 'repopublishing', viewPorts: { mainContent: { moduleId: 'repopublishing/repopublishing'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources', settings:{desc: '', isTopLevelMenu_hasChildren: true, dropdownchild: true, parent: 'Resources', firstchild: true, menuitem: 'Repository Registration'}},
      { route: 'metrics', name: 'metrics', viewPorts: { mainContent: { moduleId: 'metrics/metrics'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources', settings: { desc: '', dropdownchild: true, parent: 'Resources', firstchild: false, menuitem: 'Metrics' }},
      { route: 'badges-about', name: 'badges-about', viewPorts: { mainContent: { moduleId: 'badges-about/badges-about'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources', settings: { desc: '', dropdownchild: true, parent: 'Resources', firstchild: false, menuitem: 'About Badges' }},
      { route: 'faqs', name: 'faqs', viewPorts: { mainContent: { moduleId: 'faqs/faqs'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources', settings: { desc: '', dropdownchild: true, parent: 'Resources', firstchild: false, menuitem: 'FAQs' }},
      { route: 'additional-information', name: 'additional-information', viewPorts: { mainContent: { moduleId: 'additional-information/additional-information'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources', settings: { desc: '', dropdownchild: true, parent: 'Resources', firstchild: false, menuitem: 'Additional Information' }}
    ]);
    this.router = router;
  }

  constructor(stageConfig, env) {
    this.stageConfig = stageConfig;
    this.exitDialogLinkId = null;
    this.version = this.prepareVersion(env.version);
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

  prepareVersion(ver) {
    let parts = ver.split('.')
    let version = `${parts[0]}.${parts[1]}`
    let build = `${parts[2]}`
    return {version, build};
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
