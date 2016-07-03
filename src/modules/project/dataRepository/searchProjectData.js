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

  // getAllPage(searchText) {
  //   var adjusted_url = "";
  //   if(searchText == "" || !(searchText)){
  //     adjusted_url = baseUrl+'/orgs/boozallen/repos?client_id=a9aaad91830dbe7558bc&client_secret=82126472052081d51ab1e0be3d77e7fdd94dc84f'
  //     //adjusted_url = baseUrl+'/orgs/boozallen/repos'
  //   }
  //   else{
  //     adjusted_url = baseUrl+'/search/repositories?q='+searchText+'login=boozallen&sort=stars&order=desc?client_id=a9aaad91830dbe7558bc&client_secret=82126472052081d51ab1e0be3d77e7fdd94dc84f'
  //   }
  //
  //   return this.http.get(adjusted_url)
  //     .then(response => {
  //       console.log(response.content);
  //       return response.content;
  //     });
  // }

  getAllProjects(orgs) {
    var project_promises = [];
    var org_url = '';
    var promise = '';
    for (var org of orgs){
      org_url = baseUrl + "/orgs/"+org+"/repos?client_id=a9aaad91830dbe7558bc&client_secret=82126472052081d51ab1e0be3d77e7fdd94dc84f";
      promise =  this.http.get(org_url).then(response => {return response.content});
      project_promises.push(promise);
    }
    return Promise.all(project_promises);

  }
  getAllPages(searchText, orgs) {
    var adjusted_url = "";
    if(searchText == "" || !(searchText)){
      adjusted_url = baseUrl+'/orgs/boozallen/repos?client_id=a9aaad91830dbe7558bc&client_secret=82126472052081d51ab1e0be3d77e7fdd94dc84f'
      //adjusted_url = baseUrl+'/orgs/boozallen/repos'

          return this.http.get(adjusted_url)
            .then(response => {
              console.log(response.content);
              return response.content;
            });
    }
    else{
          adjusted_url = baseUrl+'/orgs/boozallen/repos?client_id=a9aaad91830dbe7558bc&client_secret=82126472052081d51ab1e0be3d77e7fdd94dc84f'
          return this.http.get(adjusted_url)
            .then(response => {
              console.log(response.content);
              // var projList = [];
              // for(var v of response.content){
              //   //new RegExp("e").test("The best things in life are free");
              //   console.log("owner: "+v.owner.login+" name:"+v.name+" :fullname:" + v.full_name );
              //   console.log(new RegExp(searchText).test(v.owner.login));
              //   if(new RegExp(searchText).test(v.full_name) || new RegExp(searchText).test(v.description)){
              //   //if(v.owner.login == 'boozallen'){
              //     console.log(v);
              //     projList.push(v);
              //   }
              //
              // }
              // console.log(projList);
              //return projList;
              return response.content;
            });
    }

  }

/*
return this.http.get(adjusted_url)
  .then(response => {
    console.log(response.content);
    var projList = [];
    for(var v of response.content.items){
      if(v.name == 'projectjellyfish'){
        console.log(v);
        projList.push(v);
      }

    }
    //return response.content.items;
    return projList;
  });



*/



  getAll() {
    return this.http.get(baseUrl)
      .then(response => {
        return response.content;
      });
  }
  searchByName(searchText) {
    //let adjusted_url = '/api/favorites' + '?filter={"where": {"name": {"inq": [' + '"'+searchText +'"'+ ']}}}';
    let adjusted_url = baseUrl+'/search/repositories?q='+searchText+'&per_page=101&sort=stars&order=desc'
    console.log(adjusted_url);
    return this.http.get(adjusted_url)
      .then(response => {
        console.log(response.content);
        var projList = [];
        for(var v of response.content.items){
          if(v.owner.login == 'boozallen' || v.name == 'boozallen'){
            console.log(v);
            projList.push(v);
          }

        }
        //return response.content.items;
        return projList;
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
