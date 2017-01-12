import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import $ from 'bootstrap';
import { multiselect } from 'bootstrap-multiselect';
import { DataContext } from 'services/datacontext';

@inject(DialogController, DataContext)
export class AddProjectsModal {
  constructor(controller, dataContext) {
    this.controller = controller;
    controller.settings.centerHorizontalOnly = true;
    controller.settings.lock = false;

    this.dataContext = dataContext;
    this.projects = [];

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

  activate() {
    this.getData();
  }

  attached() {
    this.setupProjectSelect();
    this.rebuildProjectSelect(this.projects);
  }

  rebuildProjectSelect(projects) {
    const options = [];
    for (const project of projects) {
      options.push({
        label: `${project.project_name} <small>(${project.organization})</small>`,
        title: project.project_name,
        value: project,
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


}
