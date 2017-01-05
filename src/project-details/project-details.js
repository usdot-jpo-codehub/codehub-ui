import { inject, bindable } from 'aurelia-framework';
import { Router, activationStrategy } from 'aurelia-router';
import { DataContext } from 'services/datacontext';

@inject(DataContext, Router)
export class ProjectDetails {

  constructor(dataContext) {
    this.dataContext = dataContext;

    this.repo = {};
    this.repo.contributors_list = [];
    this.similarProjects = [];
    this.componentDependencies = [];

    this.dependCollapsed = true;
    this.numDepends = 8;

    this.health = {}; // JSON.parse('{ "violations" : { "val" : 106.0, "frmt_val" : "106", "key" : "violations" }, "security_rating" : { "val" : 3.0, "frmt_val" : "C", "data" : "C", "key" : "security_rating" }, "sqale_rating" : { "val" : 1.0, "frmt_val" : "A", "data" : "A", "key" : "sqale_rating" }, "code_smells" : { "val" : 81.0, "frmt_val" : "81", "key" : "code_smells" }, "new_violations" : { }, "bugs" : { "val" : 24.0, "frmt_val" : "24", "key" : "bugs" }, "new_code_smells" : { }, "complexity" : { "val" : 203.0, "frmt_val" : "203", "key" : "complexity" }, "new_vulnerabilities" : { }, "vulnerabilities" : { "val" : 1.0, "frmt_val" : "1", "key" : "vulnerabilities" }, "new_bugs" : { }, "reliability_rating" : { "val" : 3.0, "frmt_val" : "C", "data" : "C", "key" : "reliability_rating" } }');

    // ** Dummy data for offline testing **
    // this.dependencies = JSON.parse('[ { "groupId": "com.googlecode.jmockit", "artifactId": "jmockit", "version": "${jmockit.version}" }, { "groupId": "com.bah.jmockit.com.googlecode.jmockit", "artifactId": "jmockit-coverage", "version": "${jmockit.coverage.version}" }, { "groupId": "org.apache.maven", "artifactId": "maven-plugin-api", "version": "2.0" }, { "groupId": "org.apache.maven.plugin-tools", "artifactId": "maven-plugin-annotations", "version": "3.2" }, { "groupId": "org.apache.maven.shared", "artifactId": "file-management", "version": "1.2.1" }, { "groupId": "org.codehaus.plexus", "artifactId": "plexus-utils", "version": "3.0.8" }, { "groupId": "junit", "artifactId": "junit", "version": "4.8.2" }, { "groupId": "org.apache.maven", "artifactId": "maven-core", "version": "3.0.1" } ]');
    // this.contributors_list = JSON.parse('[{"username":"mparker4","profile_url":"https://github.com/mparker4"},{"username":"507006","profile_url":"https://github.com/507006"},{"username":"maggie-lagos","profile_url":"https://github.com/maggie-lagos"}]');
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  activate(params) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    this.dataContext.findSimilarProjects(params.id).then(similarProjects => {
      // TODO should be using promises to catch errors
      if (!similarProjects.error) {
        setTimeout(() => {
          this.similarProjects = similarProjects;
        }, 500);
      }
    });

    this.dataContext.findById(params.id).then(repo => {
      this.repo = repo;
    });

    this.dataContext.getHealthById(params.id).then(health => {
      this.health = health;
    });

    this.dataContext.getComponentDependencies(params.id).then(depends => {
      this.componentDependencies = depends.componentDependencies;

      // TODO this fix should be done API side
      let i = depends.componentDependencies.length;
      while (i--) {
        if (this.componentDependencies[i].artifactId === undefined) {
          this.componentDependencies.splice(i, 1);
        }
      }
    });
  }

}
