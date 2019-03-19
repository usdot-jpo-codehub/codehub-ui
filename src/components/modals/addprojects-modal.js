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

    this.orgFormInput = '';
    this.nameFormInput = '';

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
        this.selectedProjects = $('#selectProject').val();
        this.selectedProjectsEmpty = false;
      } else {
        this.selectedProjects = [];
        this.selectedProjectsEmpty = true;
      }
    });
  }

  addProject() {
    if ($('.nav-tabs .active').attr('id') === 'search_select') {
      const proj = this.projects[$('#selectProjects').val()];
      const postData = {
        id: proj.id,
        name: proj.project_name,
        org_name: proj.organization,
      };

      this.controller.ok(postData);
    } else {
      const postData = {
        name: this.nameFormInput,
        org_name: this.orgFormInput,
      };

      this.controller.ok(postData);
    }
  }


}
