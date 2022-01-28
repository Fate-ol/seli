$(document).ready(function(){
		
	$('input.styler, select.styler').styler();
		
	
  function slide_r()
	{
		$('.header-wrapper').css('height',$('.header-out').height()+'px');
		$('.footer-wrapper').css('height',$('.footer').outerHeight(true)+'px');
	}
	
	$(window).resize(function()
	{
		slide_r();
	});
	slide_r();
	
	$(window).on("load", function()
	{
		slide_r();
	});

  $('.main-menu__ico').click(function() {
    $( this ).closest('.main-menu').toggleClass('open');
    return false;
  });

  $('.main-menu__ul > li > a').click(function() {
    $( this ).parent().toggleClass('active');
    return false;
  });

  $('.header-search__ico').click(function() {
    $( this ).parent().find('.header-search__form').toggleClass('open');
    return false;
  });

  $('.catalog-menu-level1 > li > a').click(function() {
    $( this ).parent().toggleClass('open');
    return false;
  });

  if (document.documentElement.clientWidth < 768) {
    $('.catalog-menu-head > a').click(function() {
      $( this ).parent().toggleClass('open');
      return false;
    });
  }  
});

