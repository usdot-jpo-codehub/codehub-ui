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

  findById(id) {
    var adjusted_url = baseUrl + "/_id:" + id;
    return this.http.fetch(adjusted_url)
      .then(response => {
        return response.content;
      });
  }

  // TODO Temporary call to ES while relevance service is set up (will be by ID)
  findByRelevance(language) {
    var adjusted_url = baseUrl + "/language:" + language;
    console.log(adjusted_url);
    return this.http.fetch(adjusted_url)
      .then(response => {
        return response.content;
      });
  }
}
