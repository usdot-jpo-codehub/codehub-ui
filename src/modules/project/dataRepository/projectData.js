import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

let baseUrl = "/api/projects";
let access_token = "";

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

  getAll() {
    return this.http.get(baseUrl)
      .then(response =>{
        return response.content;
      })
  }

  getNumberofContributors(full_name){
    var contributors_url = baseUrl + "/repos/"+full_name+"/stats/contributors"+access_token;
    return this.http.get(contributors_url)
      .then(response => {
        return response.content;
      });
}

getNumberofCommits(full_name){
  full_name = 'boozallen/projectjellyfish'
  var commits_url = baseUrl + "/repos/"+full_name+"/commits"+access_token;
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
