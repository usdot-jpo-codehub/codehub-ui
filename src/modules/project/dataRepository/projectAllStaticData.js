import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

let baseUrl = "https://api.github.com";
let access_token = "?client_id=d59cc34b4839c118aeb1&client_secret=c0902736d0aeb9d02e1d4ea69113652979d68dd6";

@inject(HttpClient)
export class ProjectAllStaticData {

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

  getAll(org) {
    var org_url = baseUrl + "/orgs/"+org+"/repos"+access_token;
    return this.http.get(org_url)
      .then(response => {
        return response.content;
      });
  }
  getReadMeUrl(repo_login) {
    var adjusted_url = baseUrl + '/repos/'+repo_login+'/readme'+access_token;
    return this.http.get(adjusted_url)
      .then(response => {
        return response.content.html_url;
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


    return request.send().then(response => response.content);
  }

}
