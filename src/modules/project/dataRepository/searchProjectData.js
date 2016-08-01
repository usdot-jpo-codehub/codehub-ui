import {inject} from "aurelia-framework";
//import {HttpClient} from "aurelia-http-client";
import {HttpClient, json} from 'aurelia-fetch-client';

let baseUrl = '/api/projects';
@inject(HttpClient)
export class SearchProjectData {
  constructor(httpClient) {
    this.http = httpClient;
  }

  getAll() {
    return this.http.fetch(baseUrl, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  searchByProjectNameOrDescription(searchText) {
    return this.http.fetch(baseUrl + '/search', {
      method: "POST",
      body: json(searchText)
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  findSuggestion(searchText) {
    return this.http.fetch(baseUrl + '/findSuggestion', {
      method: "POST",
      body: json(searchText)
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

    findById(id) {
    var adjusted_url = baseUrl + "/_id:" + id;
    return this.http.fetch(adjusted_url)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  findSimilarProjects(id) {
    var adjusted_url = baseUrl + "/findSimilarProjects/" + id;
    return this.http.fetch(adjusted_url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }
}
