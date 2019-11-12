import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
import { FeedbackModal } from 'components/modals/feedback-modal.js';
import { LeavingModal } from 'components/modals/leaving-modal.js';
import { StageConfig } from './stageConf';
import 'bootstrap';
import environment from './environment';
import 'uswds';

@inject(DialogService, StageConfig, environment)
export class App {
  configureRouter(config, router) {
    config.title = 'ITS CodeHub';
    config.options.pushState = false;
    config.map([
      { route: '', name: 'popular', viewPorts: { mainContent: { moduleId: 'popular/popular' }, headerContent: { moduleId: 'search/search-bar' } }, nav: true, title: 'Home' },
      { route: 'about', name: 'about', viewPorts: { mainContent: {moduleId: 'about/about' }, headerContent: { moduleId: 'components/headers/generic-title' } }, nav: true, title: 'About', settings: { desc: '' } },
      { route: 'explore', name: 'explore', viewPorts: { mainContent: { moduleId: 'explore/explore' }, headerContent: { moduleId: 'components/headers/generic-title' } }, nav: true, title: 'Explore', settings: { desc: '' } },
      { route: 'insight', name: 'insight', viewPorts: { mainContent: { moduleId: 'insight/insight' }, headerContent: { moduleId: 'components/headers/insight-title' } }, nav: true, title: 'Insight', settings: { desc: '', altTitle: 'Enterprise Insight' } },
      { route: 'results', name: 'results', viewPorts: { mainContent: { moduleId: 'search/results' }, headerContent: { moduleId: 'search/search-bar-secondary' } }, nav: false, title: 'Search Results' },
      { route: 'project-details', name: 'project-details', viewPorts: { mainContent: { moduleId: 'project-details/project-details' }, headerContent: { moduleId: 'components/headers/project-details-header' } }, nav: false, title: 'Project Details' },
      { route: 'profile', name: 'profile', viewPorts: { mainContent: { moduleId: 'profile/profile' },headerContent: { moduleId: 'components/headers/generic-title'} }, nav: false, title: 'Your Account', settings: { desc: '' }},
      { route: 'repopublishing', name: 'repopublishing', viewPorts: { mainContent: { moduleId: 'repopublishing/repopublishing'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources', settings:{desc: '', dropdownchild: true, parent: 'Resources', firstchild: true, menuitem: 'Repository Registration'}},
      { route: 'faqs', name: 'faqs', viewPorts: { mainContent: { moduleId: 'faqs/faqs'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources', settings: { desc: '', dropdownchild: true, parent: 'Resources', firstchild: false, menuitem: 'FAQs' }},
      { route: 'additional-information', name: 'additional-information', viewPorts: { mainContent: { moduleId: 'additional-information/additional-information'}, headerContent: { moduleId: 'components/headers/generic-title'}}, nav: true, title: 'Resources', settings: { desc: '', dropdownchild: true, parent: 'Resources', firstchild: false, menuitem: 'Additional Information' }}
      
      //put resources drop down here
    ]);
    this.router = router;
  }

  constructor(dialogService, stageConfig, env) {
    this.dialogService = dialogService;
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

  // mapNavigation(config, router) {
  //   let promises = [];
  //   let c = config ? config : {route: null};
  //   router.navigation.forEach( nav => {
  //     if (c.route !== nav.config.route) {
  //       promises.push(this.mapNavigationItem(nav, router));
  //     } else {
  //       promises.push(Promise.resolve(nav));
  //     }
  
  //   })
  //   return Promise.all(promises)
  // }

  // mapNavigationItem(navModel, router) {
  //   const config = /*<any>*/nav.config;
  //   const navModel = nav;
  
  //   if (config.moduleId) {
  //     const childContainer = router.container.createChild();
  //     const instruction = {
  //       viewModel: relativeToFile(config.moduleId, Origin.get(router.container.viewModel.constructor).moduleId),
  //       childContainer: childContainer,
  //       view: config.view || config.viewStrategy,
  //     };
  //     return this.compositionEngine.ensureViewModel(/*<any>*/instruction)
  //     .then((context) => {
  //       if ('configureRouter' in context.viewModel) {
  //         const childRouter = new Router(childContainer, router.history)
  //         const childConfig = new RouterConfiguration()
  
  //         context.viewModel.configureRouter(childConfig, childRouter)
  //         childConfig.exportToRouter(childRouter)
  
  //         childRouter.navigation.forEach( nav => {
  //           nav.href = `${navModel.href}/${nav.config.href ? nav.config.href : nav.config.name}`
  //         })
  //         return this.mapNavigation(childRouter, config)
  //           .then(r => navModel.navigation = r)
  //           .then( () => navModel);
  //       }
  //       return navModel
  //     })
  //   }
  //   return Promise.resolve(navModel);
  // }
  // attached() {
  //   return this.mapNavigation(this.router)
  // }
}
