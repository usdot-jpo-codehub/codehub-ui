import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

let baseUrl = "/api/projects";

@inject(HttpClient)
export class ProjectData {

  constructor(httpClient) {
    this.http = httpClient;
  }

  getAll() {
    return this.http.get(baseUrl + '/searchByPopularity')
      .then(response =>{
        return response.content;
      })
  }
}
