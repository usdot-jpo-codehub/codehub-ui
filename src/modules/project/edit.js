import {inject} from "aurelia-framework";
import {ProjectData} from "./projectData";
import {Router} from "aurelia-router";
//import {Validation} from "aurelia-validation";

@inject(ProjectData, Router)
export class Edit {

  constructor(data, router) {
    this.data = data;
    this.router = router;
  }

  cancel(){
    //this.customer = this.original;
    return this._loadProject(this.project.id);
  }

  goBack(){
    window.history.back();
  }

  activate(params) {
    this.original = {};
    this.project = {};

    if (params.id) {
       return this._loadProject(params.id);
    }
  }
  _loadProject(id){
    return this.data.getById(id)
        .then(project => {
          this.original = JSON.parse(JSON.stringify(project));
          return this.project = project;
        });
  };

  get isUnchanged(){
    return this.areEqual(this.project, this.original);
  }
  save() {
    this.data.save(this.project)
      .then(project => {
        this.original = JSON.parse(JSON.stringify(project));
        this.router.navigate("list");
      });
  };
  areEqual(obj1, obj2) {
  return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
};
}
