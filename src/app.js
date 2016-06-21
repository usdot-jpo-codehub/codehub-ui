export class App {
  configureRouter(config, router) {
    config.title = 'Stage';
    config.options.pushState = true;
    config.map([
      { route: '', name: 'project',  moduleId: 'modules/project/popular/list',   nav: true,  title: 'Popular' },
      { route: 'projects', name: 'projects',      moduleId: 'modules/project/all-projects/list-all-projects',   nav: true, title: 'Explore' },
      { route: 'favorites', name: 'favorites',      moduleId: 'modules/project/favorites/list-favorites',  nav: true, title: 'Favorites' },
      { route: 'result',      name: 'result',     moduleId: 'modules/project/popular/result', nav: false},
      { route: 'project-details-all',      name: 'project-details-all',     moduleId: 'modules/project/all-projects/project-details-all', nav: false,title: 'popular-detail-all'},
      { route: 'project-details-favorites',      name: 'project-details-favorites',     moduleId: 'modules/project/favorites/project-details-favorites', nav: false, title:'popular-detail-favorites'},
      { route: 'project-details-popular',      name: 'project-details-popular',     moduleId: 'modules/project/popular/project-details-popular', nav: false, title:'popular-detail-popular'},
      { route: 'result-all',      name: 'result-all',     moduleId: 'modules/project/all-projects/result-all', nav: false},
      { route: 'result-favorites',      name: 'result-favorites',     moduleId: 'modules/project/favorites/result-favorites', nav: false}
    ]);
    this.router = router;
  }
}
