import $ from 'jquery';

export class NavBar {

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
