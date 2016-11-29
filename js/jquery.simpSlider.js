(function( $ ) {

	$.fn.myPlugin = function(options) {

    var settings = $.extend( {
      padding : 0,
      animationSpeed : 300
    }, options);


    return this.each(function(){

      var carousel = $(this);

      carousel.wrap("<div class='globalSliderWrap'></div>");
      carousel.wrap("<div class='sliderWrap'></div>");

      var globalSliderWrapper = $('.globalSliderWrap'),
          sliderWrapper = $('.sliderWrap'),
          imageWidth = carousel.find('img').width(),
          imageHeight = carousel.find('img').height(),
          
          sliderCaption = $('<ul></ul>').addClass('captionWrap'),
          buttonPrev = $('<li><span>&lt;</span></li>').addClass('prev'),
          buttonNext = $('<li><span>></span></li>').addClass('next'),
          firstSlide = carousel.find('li:first-child'),
          lastSlide = carousel.find('li:last-child');
        

          firstSlide.clone().appendTo(carousel).addClass('last-clone');
          lastSlide.clone().prependTo(carousel).addClass('first-clone');
          firstSlide.addClass('active');

          activeSlide = $('.active');

          slidesQty = carousel.children().length;
      
      carousel.css({
        'left' : 0 - imageWidth,
        'width' : imageWidth * slidesQty
      });

      globalSliderWrapper.css({ 
        'width' : imageWidth,
        'height' : imageHeight,
        'padding' : settings.padding
      });

      sliderCaption.appendTo(globalSliderWrapper);
      buttonPrev.appendTo(sliderCaption);
      buttonNext.appendTo(sliderCaption);

      var next = function () {
        var currentButton = $(this),
            slidePosition = carousel.position();

        currentButton.unbind('click', next);

        carousel.animate({ left: slidePosition.left - imageWidth }, settings.animationSpeed, function(){
          activeSlide = activeSlide.removeClass('active').next().addClass('active');
          if(activeSlide.hasClass('last-clone')) {
            carousel.css({
              'left' : 0 - imageWidth 
            });            
              
            activeSlide.removeClass('active');
            activeSlide = carousel.find('li:first-child').next().addClass('active');
          }

          currentButton.bind('click', next);
        });
      };

      var prev = function () {
        var currentButton = $(this),
            slidePosition = carousel.position();

        currentButton.unbind('click', prev);

        carousel.animate({ left: slidePosition.left + imageWidth}, settings.animationSpeed, function(){
          activeSlide = activeSlide.removeClass('active').prev().addClass('active');

          if(activeSlide.hasClass('first-clone')) {                     
            carousel.css({
              'left' : -(imageWidth * slidesQty) + (imageWidth * 2)
            });

            activeSlide.removeClass('active');
            activeSlide = carousel.find('li:last-child').prev().addClass('active');
          }

          currentButton.bind('click', prev);
        });
      };  
    
      buttonNext.on('click', next);
      buttonPrev.on('click', prev);  

    });

 }     
  	
})(jQuery);

$(document).ready(function(){
  $('#simpSlider').myPlugin({
    animationSpeed: 400
  }); 
})
