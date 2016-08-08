import { inject, bindable } from 'aurelia-framework';
import { Router, activationStrategy } from 'aurelia-router';
import { SearchProjectData } from '../dataRepository/searchProjectData';

@inject(SearchProjectData, Router)
export class ProjectDetailsPopular {

  constructor(searchProjectData, searchProject, searchText) {
    this.searchProjectData = searchProjectData;
    this.searchProject = searchProject;
    this.repo = {};
    this.similarProjects = [];

    // this.dependencies = JSON.parse('[ { "groupId": "com.googlecode.jmockit", "artifactId": "jmockit", "version": "${jmockit.version}" }, { "groupId": "com.bah.jmockit.com.googlecode.jmockit", "artifactId": "jmockit-coverage", "version": "${jmockit.coverage.version}" }, { "groupId": "org.apache.maven", "artifactId": "maven-plugin-api", "version": "2.0" }, { "groupId": "org.apache.maven.plugin-tools", "artifactId": "maven-plugin-annotations", "version": "3.2" }, { "groupId": "org.apache.maven.shared", "artifactId": "file-management", "version": "1.2.1" }, { "groupId": "org.codehaus.plexus", "artifactId": "plexus-utils", "version": "3.0.8" }, { "groupId": "junit", "artifactId": "junit", "version": "4.8.2" }, { "groupId": "org.apache.maven", "artifactId": "maven-core", "version": "3.0.1" } ]');
    // this.contributors_list = JSON.parse('[{"username":"mparker4","profile_url":"https://github.com/mparker4"},{"username":"507006","profile_url":"https://github.com/507006"},{"username":"maggie-lagos","profile_url":"https://github.com/maggie-lagos"}]');
    this.repo.contributors_list = [];
  }

  getViewStrategy() {
    return '../common/project-details.html';
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  activate(params, routeConfig, navigationInstruction) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    this.searchProjectData.findSimilarProjects(params.id).then(similarProjects => {
      this.similarProjects = similarProjects;
    });

    this.searchProjectData.findById(params.id).then(repo => {
      this.repo = repo;

      if (repo.language === 'Java') {
        this.searchProjectData.getJavaDependencies(repo.organization, repo.project_name).then(dependencies => {
          this.dependencies = dependencies;
        });
      }
    });
  }

}
