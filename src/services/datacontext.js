import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

const baseUrl = '/api/projects';

@inject(HttpClient)
export class DataContext {
  constructor(httpClient) {
    this.http = httpClient;
  }

  // TODO Wrap API calls in promises to catch errors

  getAll() {
    return this.http.fetch(baseUrl, {
      method: 'GET',
    })
      .then(response => response.json());
  }

  getPopular() {
    return this.http.fetch(`${baseUrl}/searchByPopularity`, {
      method: 'GET',
    })
      .then(response => response.json());
  }

  searchByProjectNameOrDescription(searchText) {
    return this.http.fetch(`${baseUrl}/search`, {
      method: 'POST',
      body: json(searchText),
    })
      .then(response => response.json());
  }

  findSuggestion(searchText) {
    return this.http.fetch(`${baseUrl}/findSuggestion`, {
      method: 'POST',
      body: json(searchText),
    })
      .then(response => response.json());
  }

  findById(id) {
    const adjustedURL = `${baseUrl}/_id:${id}`;
    return this.http.fetch(adjustedURL)
      .then(response => response.json());
  }

  findSimilarProjects(id) {
    const adjustedURL = `${baseUrl}/findSimilarProjects/${id}`;
    return this.http.fetch(adjustedURL, {
      method: 'GET',
    })
      .then(response => response.json());
  }

  getJavaDependencies(org, name) {
    const adjustedURL = `${baseUrl}/findProjectDependencies/${org}/${name}`;
    return this.http.fetch(adjustedURL, {
      method: 'GET',
    })
      .then(response => response.json());
  }

}
