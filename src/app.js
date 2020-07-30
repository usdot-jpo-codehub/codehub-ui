import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import StageConfig from './stageConf';
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
      { route: 'templates-and-guides', name: 'templates-and-guides', viewPorts: { mainContent: { moduleId: 'templates-and-guides/templates-and-guides'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources', settings: { desc: '', isTopLevelMenu_hasChildren: false, child: true, topLevelMenu_parentName: 'Resources', firstchild: true, menuitemLabel: 'Templates & Guides', headerLabel: 'Site Resources', displayheader: true}},
      { route: 'repopublishing', name: 'repopublishing', viewPorts: { mainContent: { moduleId: 'repopublishing/repopublishing'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources', settings: { desc: '', child: true, topLevelMenu_parentName: 'Resources', firstchild: false, menuitemLabel: 'Repository Registration', headerLabel: 'Site Resources'}},
      { route: 'metrics', name: 'metrics', viewPorts: { mainContent: { moduleId: 'metrics/metrics'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources', settings: { desc: '', child: true, topLevelMenu_parentName: 'Resources', firstchild: false, menuitemLabel: 'Metrics', headerLabel: 'Site Resources' }},
      { route: 'badges-about', name: 'badges-about', viewPorts: { mainContent: { moduleId: 'badges-about/badges-about'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources',                                 settings: { desc: '', child: true, topLevelMenu_parentName: 'Resources', firstchild: false, menuitemLabel: 'About Badges', headerLabel: 'Site Resources' }},
      { route: 'faqs', name: 'faqs', viewPorts: { mainContent: { moduleId: 'faqs/faqs'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources', settings: { desc: '', child: true, topLevelMenu_parentName: 'Resources', firstchild: false, menuitemLabel: 'FAQs', headerLabel: 'Site Resources' }},
      { route: 'additional-information', name: 'additional-information', viewPorts: { mainContent: { moduleId: 'additional-information/additional-information'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources', settings: { desc: '', child: true, topLevelMenu_parentName: 'Resources', firstchild: false, menuitemLabel: 'Additional Information', headerLabel: 'Site Resources' }},
      { route: 'source-code-guidelines', name: 'source-code-guidelines', viewPorts: { mainContent: { moduleId: 'source-code-guidelines/source-code-guidelines'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources', settings:{desc: '', isTopLevelMenu_hasChildren: true, child: true, topLevelMenu_parentName: 'Resources', firstchild: true, menuitemLabel: 'Source Code Guidelines', headerLabel: 'Source Code Guidelines'}},
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
