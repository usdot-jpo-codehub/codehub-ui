import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';
import { typeahead } from 'corejs-typeahead';
import { DataContext } from 'services/datacontext';

@inject(DataContext, Router, EventAggregator)
export class NavBar {

  constructor(dataContext, router, eventAggregator) {
    this.dataContext = dataContext;
    this.router = router;
    this.eventAggregator = eventAggregator;

    this.PF_AUTH_GIVENNAME = PF_AUTH_GIVENNAME !== '' ? PF_AUTH_GIVENNAME : 'Guest'; // eslint-disable-line

    this.navSearchText = '';
  }

  executeNavSearch(searchText) {
    this.eventAggregator.publish('searchExecuted', searchText);

    this.router.navigateToRoute('results', { searchText });
    $('#navSearchBox .typeahead').typeahead('close');
    this.hideNavSearch();
  }

  hideNavSearch() {
    $('#searchBtn').removeClass('hidden');
    $('#titleBarNav').removeClass('hidden');
    $('#searchForm').addClass('hidden');
    $('#searchBtn').parent().removeClass('hidden');
  }

  attached() {
    $('#searchBtn').on('click', event => {
      $('#searchBtn').parent().addClass('hidden');
      $('#titleBarNav').addClass('hidden');
      $('#searchForm').removeClass('hidden');
      $('#searchForm input').focus();
      this.navSearchText = '';
      $('#navSearchBox .typeahead').typeahead('val', '');
    });

    $('#searchForm input').focusout(event => {
      this.hideNavSearch();
    });

    const search = this.dataContext;

    const suggestions = (query, syncResults, asyncResults) => {
      search.findSuggestions(query).then(data => {
        const matches = [];
        for (const obj in data) {
          if ({}.hasOwnProperty.call(data, obj)) {
            const array = data[obj].source;
            let lastWord;
            const matchObj = {};

            if (array.length > 1) {
              lastWord = ` and${array.pop()}`;
              if (array.length > 1) {
                lastWord = `,${lastWord}`;
              }
            } else {
              lastWord = '';
            }
            const found = array.join(',') + lastWord;

            matchObj.text = data[obj].text;
            matchObj.found = found;

            matches.push(matchObj);
          }
        }
        asyncResults(matches);
      });
    };

    $('#navSearchBox .typeahead').typeahead({
      hint: true,
      minLength: 1,
      limit: 1000,
    },
      {
        name: 'suggestions',
        display: 'text',
        source: suggestions,
        templates: {
          empty() { return '<div class="tt-suggestion tt-selectable">No results found</div>'; },
          suggestion(data) {
            return `<div class="tt-suggestion tt-selectable"> ${data.text} <span class="tt-source"><strong>${data._query}</strong> found in project ${data.found}</span></div>`;
          },
        },
      });

    $('#navSearchBox .typeahead').bind('typeahead:select', (ev, suggestion) => {
      this.executeNavSearch(suggestion.text);
    });

    $('#navSearchBox .typeahead').bind('typeahead:autocompleted', (ev, suggestion) => {
      this.navSearchText = suggestion.text;
    });

    /*eslint-disable */
    var pxScrolled = 25;
    var duration = 500;

    $(window).scroll(function() {
      if ($(this).scrollTop() > pxScrolled) {
        $('.navbar').addClass('sticky-header');
        //$('.fab-back-top').removeClass('hidden');
        $('.fab-container').css({'bottom': '0px', 'transition': '.05s'});
      } else {
        $('.navbar').removeClass('sticky-header');
        //$('.fab-back-top').addClass('hidden');
        $('.fab-container').css({'bottom': '-72px'});
      }
    });

    $('#backToTop').click(function(e) {
      e.preventDefault();
      $('body').animate({scrollTop: 0}, duration);
    });
    /*eslint-enable */
  }
}
