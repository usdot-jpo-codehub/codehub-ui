import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

let baseUrl = "https://api.github.com";

@inject(HttpClient)
export class ProjectData {

  constructor(httpClient) {
    this.http = httpClient;
  }

  getById(id) {
    return this.http.get(`${baseUrl}/${id}`)
      .then(response => {
        return response.content;
      });
  }

  getPage(pageNumber) {
    return this.http.createRequest(baseUrl)
      .asGet()
      .withParams({'page': pageNumber})
      .send()
      .then(response => {
        return response.content;
      });
  }

  getAll(orgs) {
    var project_promises = [];
    var org_url = '';
    var promise = '';
    for (var org of orgs){
      org_url = baseUrl + "/orgs/"+org+"/repos";
      promise =  this.http.get(org_url).then(response => {return response.content});
      project_promises.push(promise);
    }
    return Promise.all(project_promises);

  }

  getNumberofContributors(full_name){
    var contributors_url = baseUrl + "/repos/"+full_name+"/stats/contributors";
    return this.http.get(contributors_url)
      .then(response => {
        return response.content;
      });
}

getNumberofCommits(full_name){
  full_name = 'boozallen/projectjellyfish'
  var commits_url = baseUrl + "/repos/"+full_name+"/commits?client_id=a9aaad91830dbe7558bc&client_secret=82126472052081d51ab1e0be3d77e7fdd94dc84f";
  return this.http.get(commits_url)
    .then(response => {
      return response.content.length;
    });
}
  save(project) {
    var request = this.http.createRequest();
    if (project.id) {
      request.asPut()
        .withUrl(`${baseUrl}/${project.id}`)
        //TODO check if withHeader still necessary
        .withHeader("Accept", "application/json")
        .withHeader("Content-Type", "application/json")
        .withContent(project);
    }
    else {
      request.asPost()
        .withUrl(baseUrl)
        //TODO check if withHeader still necessary
        .withHeader("Accept", "application/json")
        .withHeader("Content-Type", "application/json")
        .withContent(project);
    }
    ;

    return request.send().then(response => response.content);
  }

}
