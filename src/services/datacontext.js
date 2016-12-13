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

  findPopular() {
    return this.http.fetch(`${baseUrl}/findPopular`, {
      method: 'GET',
    })
      .then(response => response.json());
  }

  search(searchText) {
    return this.http.fetch(`${baseUrl}/search`, {
      method: 'POST',
      body: json(searchText),
    })
      .then(response => response.json());
  }

  findSuggestions(searchText) {
    return this.http.fetch(`${baseUrl}/findSuggestions`, {
      method: 'POST',
      body: json(searchText),
    })
      .then(response => response.json());
  }

  findById(id) {
    const adjustedURL = `${baseUrl}/findById/${id}`;
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

  getHealthById(id) {
    const adjustedURL = `${baseUrl}/findSonarHealthMetrics/${id}`;
    return this.http.fetch(adjustedURL, {
      method: 'GET',
    })
      .then(response => response.json());
  }

}
