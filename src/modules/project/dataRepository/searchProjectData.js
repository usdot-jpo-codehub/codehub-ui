import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

//let baseUrl = '/api/favorites';
let baseUrl = 'https://api.github.com';

@inject(HttpClient)
export class SearchProjectData {

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

  getAllProjects(orgs) {
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

  getAll() {
    return this.http.get(baseUrl)
      .then(response => {
        return response.content;
      });
  }
  searchByName(searchText) {
    //let adjusted_url = '/api/favorites' + '?filter={"where": {"name": {"inq": [' + '"'+searchText +'"'+ ']}}}';
    let adjusted_url = baseUrl+'/search/repositories?q='+searchText+'&per_page=100&sort=stars&order=desc'
    return this.http.get(adjusted_url)
      .then(response => {
        return response;
      });
  }

  searchFavoritesByName(searchText) {
    //let adjusted_url = '/api/favorites' + '?filter={"where": {"name": {"inq": [' + '"'+searchText +'"'+ ']}}}';
    return this.http.get(baseUrl)
      .then(response => {
        return response.content;
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
