import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { StageConfig } from '../stageConf';

const baseUrl = '/api/projects';

@inject(HttpClient, StageConfig)
export class DataContext {
  constructor(httpClient, stageConfig) {
    this.http = httpClient;
    this.stageConfig = stageConfig;
  }

  // TODO Wrap API calls in promises to catch errors

  getAll() {
    return this.http.fetch(`${baseUrl}/getAll`, {
      method: 'GET',
    })
      .then(response => {
        if(response && response.ok) {
          return response.json()
        }
        return null;
      });
  }

  findPopular() {
    return this.http.fetch(`${baseUrl}/findPopular`, {
      method: 'GET',
    })
      .then(response => {
        if (response && response.ok) {
          return response.json();
        }
        return null;
      });
  }

  findFeatured() {
    return this.http.fetch(`${baseUrl}/findFeatured`, {
      method: 'GET'
    }).then( (response) => {
      if (response && response.ok) {
        return response.json();
      }
      return null;
    });
  }

  findEnterpriseInsight() {
    return this.http.fetch('/api/codes/findEnterpriseInsight', {
      method: 'GET',
    })
      .then(response => response.json());
  }

  getLastProcessedDateTime() {
    return this.http.fetch('/api/codes/getLastProcessedDateTime', {
      method: 'GET',
    })
      .then(response => {
        if (response && response.ok) {
          return response.json();
        }
        return null;
      });
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
      .then(response => {
        if (response && response.ok) {
          return response.json();
        }
        return null;
      });
  }

  findById(id) {
    const adjustedURL = `${baseUrl}/findById/${id}`;
    return this.http.fetch(adjustedURL)
      .then(response => {
        if (response && response.ok) {
          return response.json();
        }
        return null;
      });
  }

  findByIds(ids) {
    return this.http.fetch(`${baseUrl}/findByIds`, {
      method: 'POST',
      body: json(ids),
    })
      .then(response => {
        if (response && response.ok) {
          return response.json();
        }
        return null;
      });
  }

  findSimilarProjects(id) {
    const adjustedURL = `${baseUrl}/findSimilarProjects/${id}`;
    return this.http.fetch(adjustedURL, {
      method: 'GET',
    })
      .then(response => {
        if (response && response.ok) {
          return response.json();
        }
        return null;
      });
  }

  getHealthById(id) {
    const adjustedURL = `${baseUrl}/findSonarHealthMetrics/${id}`;
    return this.http.fetch(adjustedURL, {
      method: 'GET',
    })
      .then(response => {
        if(response && response.ok) {
          return response.json();
        }
        return null;
      });
  }

  getComponentDependencies(id) {
    const adjustedURL = `${baseUrl}/findComponentDependencies/${id}`;
    return this.http.fetch(adjustedURL, {
      method: 'GET',
    })
      .then(response => {
        if (response && response.ok) {
          response.json();
        }
        return null;
      });
  }

  postUsedProject(postObject, id) {
    return this.http.fetch(`${baseUrl}/addForkedProjects/${id}`, {
      method: 'POST',
      body: json(postObject),
    })
      .then(response => {
        if (response && response.ok){
          return response.json();
        }
        return null;
      });
  }

  findHealthiest() {
    return this.http.fetch('/api/codes/findHealthiest', {
      method: 'GET',
    })
      .then((response) => {
        if (response && response.ok) {
          return response.json();
        }
        return null;
      });
  }

  registerUserEmail(email) {
    let payload = {
      'email': email,
      'listId': this.stageConfig.EMAIL_LISTID
    }
    console.log(payload);
    return this.http.fetch(`/apicc/v1/contacts`, {
      method: 'POST',
      body: json(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response && response.ok) {
        let jObj = response.json();

        return jObj;
      }
      return null;
    });
  }

}
