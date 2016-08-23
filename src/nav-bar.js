import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import $ from 'jquery';
import { DataContext } from 'services/datacontext';

@inject(DataContext, Router)
export class NavBar {

  constructor(dataContext, router) {
    this.dataContext = dataContext;
    this.router = router;

    this.searchText = '';
  }

  executeSearch(searchText) {
    this.router.navigateToRoute('results', { searchText });
    $('#searchBox .typeahead').typeahead('close');
  }

  attached() {
    $('#searchBtn').on('click', event => {
      $('#searchBtn').parent().addClass('hidden');
      $('#titleBarNav').addClass('hidden');
      $('#searchForm').removeClass('hidden');
      $('#searchForm input').focus();
    });

    $('#searchForm input').focusout(event => {
      $('#searchBtn').removeClass('hidden');
      $('#titleBarNav').removeClass('hidden');
      $('#searchForm').addClass('hidden');
      $('#searchBtn').parent().removeClass('hidden');
    });
  }

}
