$(function () {
  // ヘッダーFix
  var main_container = $('.main_container');
  // メニューのtop座標を取得する
  var offsetTop = main_container.offset().top;

  var floatMenu = function() {
      // スクロール位置がメニューのtop座標を超えたら固定にする
      if ($(window).scrollTop() > 88) {
        main_container.addClass('fixed');
      } else {
        main_container.removeClass('fixed');
      }
  }
  $(window).scroll(floatMenu);
  $('body').bind('touchmove', floatMenu);
});
