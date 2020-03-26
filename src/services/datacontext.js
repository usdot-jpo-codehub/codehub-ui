import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { StageConfig } from '../stageConf';
import environment from '../environment';

const baseUrl = '/api/v1';

@inject(HttpClient, StageConfig, environment)
export class DataContext {
  constructor(httpClient, stageConfig, env) {
    this.http = httpClient;
    this.stageConfig = stageConfig;
    this.env = env;
  }

  // TODO Wrap API calls in promises to catch errors

  getRepositories(owners) {
    let url = `${this.env.webApiUrl}${baseUrl}/repositories` + (owners ? `?owner=${owners}` : '');
    return this.http.fetch(url, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      if(data.code == 200) {
          return data.result;
        }
        return null;
      });
  }

  findPopular() {
    return this.http.fetch(`${this.env.webApiUrl}${baseUrl}/repositories?limit=6&rank=popular`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        if (data.code == 200) {
          return data.result;
        }
        return null;
      })
      .catch( e => { return null; });
  }

  findFeatured() {
    return this.http.fetch(`${this.env.webApiUrl}${baseUrl}/repositories?limit=5&rank=featured`, {
      method: 'GET'
    })
    .then( (response) => response.json())
    .then( data => {
      if (data.code == 200) {
        return data.result;
      }
      return null;
    })
    .catch( e => {return null;});
  }

  getMetrics(organizations) {
    let url = `${this.env.webApiUrl}${baseUrl}/metrics` + (organizations ? `/${organizations}` : '')
    return this.http.fetch(url, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      if (data.code == 200) {
          return data.result;
        }
        return null;
      });
  }

  getProjectsByOrganization(organization) {
    return this.http.fetch(`${this.env.webApiUrl}${baseUrl}/getProjectsByOrganization`, {
      method: 'POST',
      body: json(organization),
    }).then(response => {
      if (response && response.ok) {
        return response.json();
      }
      return null;
    });
  }

  getLastProcessedDateTime() {
    return this.http.fetch(`${this.env.webApiUrl}/api/codes/getLastProcessedDateTime`, {
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
    let searchObj = {
      term: searchText,
      limit: 1000,
      matchAll: false
    }
    return this.http.fetch(`${this.env.webApiUrl}${baseUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json'
      },
      body: json(searchObj),
    })
      .then(response => response.json())
      .then(data => {
        if (data.code == 200) {
          return data.result;
        }
      });
  }

  findSuggestions(searchText) {
    return this.http.fetch(`${this.env.webApiUrl}${baseUrl}/findSuggestions`, {
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
    const adjustedURL = `${this.env.webApiUrl}${baseUrl}/repositories/${id}`;
    return this.http.fetch(adjustedURL)
      .then(response => response.json())
      .then(data => {
        if (data.code == 200 && data.result.length>0 ) {
          return data.result[0];
        }
        return null;
      });
  }

  findByIds(ids) {
    return this.http.fetch(`${this.env.webApiUrl}${baseUrl}/repositories/${ids}`)
      .then(response => response.json())
      .then(data => {
        if (data.code == 200 && data.result.length>0) {
          return data.result;
        }
        return null;
      });
  }

  findSimilarProjects(id) {
    const adjustedURL = `${this.env.webApiUrl}${baseUrl}/findSimilarProjects/${id}`;
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
    const adjustedURL = `${this.env.webApiUrl}${baseUrl}/findSonarHealthMetrics/${id}`;
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
    const adjustedURL = `${this.env.webApiUrl}${baseUrl}/findComponentDependencies/${id}`;
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
    return this.http.fetch(`${this.env.webApiUrl}${baseUrl}/addForkedProjects/${id}`, {
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
    return this.http.fetch(`${this.env.webApiUrl}${baseUrl}/repositories?limit=6&rank=healthiest&order=asc`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        if (data.code == 200) {
          return data.result;
        }
        return null;
      });
  }

  registerUserEmail(email) {
    let payload = {
      'email': email,
      'listId': this.stageConfig.EMAIL_LISTID
    }
    return this.http.fetch(`${this.env.apiCCUrl}/apicc/v1/contacts`, {
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

  getCategories() {
    let url = `${this.env.webApiUrl}${baseUrl}/configurations/categories`;
    return this.http.fetch(url, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      if(data.code == 200) {
          return data.result;
        }
        return null;
      });
  }

  getEngagementPopups() {
    let url = `${this.env.webApiUrl}${baseUrl}/configurations/engagementpopups`;
    return this.http.fetch(url, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      if(data.code == 200) {
          return data.result;
      }
      return [];
    });
  }
}
