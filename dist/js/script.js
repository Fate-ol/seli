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


  $('.news-detail__slider').slick({
		centerMode: true,
		centerPadding: '0px',
		slidesToShow: 1,
    fade: true,
	});


});

ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
          center: [55.780370, 37.686734],
          zoom: 9
      }, {
          searchControlProvider: 'yandex#search'
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Собственный значок метки',
          balloonContent: 'Россия, Москва, Балакиревский переулок, 1А'
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: '../img/map-marker2.png',
          // Размеры метки.
          iconImageSize: [54, 69],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-5, -38]
      }),

      myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
          hintContent: 'Собственный значок метки с контентом',
          balloonContent: 'Россия, Москва, Балакиревский переулок, 1А',
          iconContent: '12'
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#imageWithContent',
          // Своё изображение иконки метки.
          iconImageHref: '../img/map-marker2.png',
          // Размеры метки.
          iconImageSize: [48, 48],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-24, -24],
          // Смещение слоя с содержимым относительно слоя с картинкой.
          iconContentOffset: [15, 15],
          // Макет содержимого.
          iconContentLayout: MyIconContentLayout
      });

  myMap.geoObjects
      .add(myPlacemark)
      .add(myPlacemarkWithContent);
});