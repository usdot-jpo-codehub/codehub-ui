import $ from 'jquery';

export class NavBar {

  attached() {
    $('#searchBtn').on('click', event => {
      $(this).addClass('hidden');
      $('#searchBtn').parent().addClass('hidden');
      $('#titleBarNav').addClass('hidden');
      $(this).closest($('.container-fluid')).find($('#titleBarNav')).addClass('hidden');
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
