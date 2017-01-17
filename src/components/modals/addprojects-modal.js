import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Router } from 'aurelia-router';
import $ from 'bootstrap';
import { multiselect } from 'bootstrap-multiselect';
import { DataContext } from 'services/datacontext';

@inject(DialogController, DataContext, Router)
export class AddProjectsModal {
  constructor(controller, dataContext, router) {
    this.controller = controller;
    controller.settings.centerHorizontalOnly = true;
    controller.settings.lock = false;

    this.dataContext = dataContext;
    this.projects = [];

    this.router = router;
    this.repo = [];

    this.selectedProjects = [];
    this.selectedProjectsEmpty = true;
  }

  getData() {
    return this.dataContext.getAll()
      .then(projects => {
        setTimeout(() => {
          this.projects = JSON.parse(JSON.stringify(projects));
          this.rebuildProjectSelect(projects);
          $('#selectProjects').click();
          return this.projects;
        }, 10);
      });
  }

  activate(repo) {
    this.repo = repo;
    this.getData();
  }

  attached() {
    this.setupProjectSelect();
    this.rebuildProjectSelect(this.projects);
  }

  rebuildProjectSelect(projects) {
    const options = [];
    for (let i = 0; i < projects.length; i++) {
      options.push({
        label: `${projects[i].project_name} <small>(${projects[i].organization})</small>`,
        title: projects[i].project_name,
        value: i,
        selected: false,
      });
    }
    $('#selectProjects').multiselect('dataprovider', options);
    $('#selectProjects').trigger('change');
    $('.multiselect-container').css('display', 'block');
    $('.multiselect').click(e => {
      e.stopPropagation();
    });
  }

  setupProjectSelect() {
    $('#selectProjects').multiselect({
      enableFiltering: true,
      disableIfEmpty: true,
      enableCaseInsensitiveFiltering: true,
      maxHeight: 250,
      enableHTML: true,
      buttonText(options, select) {
        if (options.length === 0) {
          return 'Projects';
        } else if (options.length === options.prevObject.length) {
          return 'Projects';
        }
        return 'Projects';
      },
    });

    $('#selectProjects').on('change', ev => {
      if ($('#selectProjects').val()) {
        parent.selectedProjects = $('#selectProject').val();
        parent.selectedProjectsEmpty = false;
      } else {
        parent.selectedProjects = [];
        parent.selectedProjectsEmpty = true;
      }
    });
  }

  addProject() {
    const proj = this.projects[$('#selectProjects').val()];

    const postData = {
      id: proj.id,
      name: proj.project_name,
      org_name: proj.organization,
    };

    this.dataContext.postUsedProject(postData, this.repo.id).then(response => {
      this.router.navigateToRoute('project-details', { id: this.repo.id });
    });
  }


}
