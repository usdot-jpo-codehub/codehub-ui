import {inject} from 'aurelia-framework';
import {FavoriteProject} from "./favoriteProject";
import {Router} from "aurelia-router";
@inject(FavoriteProject, Router)
export class List {
  heading = 'Projects List';

  constructor(data, router) {
    this.service = data;
    this.currentPage = 0;
    this.router = router;
  };

  gotoProject(project){
    this.router.navigateToRoute('edit', { id: project.id })
  };

  new(){
    this.router.navigateToRoute('create');
  };

  getData() {
    this.currentPage++;
    return this.service.getAll()
      .then(projects => {
       this.projects = projects;

     });

  }

  activate() {
    return this.getData();
  }
}
