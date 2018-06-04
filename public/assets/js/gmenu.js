$(function () {
  // グローバルメニューの開閉
  var $body = $('body');
  $('.page_header .menu_btn').on('click', function () {
    $body.addClass('gmenu_open');
    $('.main_container .overlay').on('click', function () {
      $body.removeClass('gmenu_open');
    });
    $('.gmenu .close_btn').on('click', function () {
      $body.removeClass('gmenu_open');
    });
  });
});
