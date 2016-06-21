/* Latest compiled and minified JavaScript included as External Resource */
$.fn.extend({
	equalHeights: function(){
		var top=0;
		var row=[];
		var classname=('equalHeights'+Math.random()).replace('.','');
		$(this).each(function(){
			var thistop=$(this).offset().top;
			if (thistop>top) {
				$('.'+classname).removeClass(classname); 
				top=thistop;
			}
			$(this).addClass(classname);
			$(this).height('0');
			var h=(Math.max.apply(null, $('.'+classname).map(function(){ return $(this).outerHeight(); }).get()));
			$('.'+classname).height(h);
		}).removeClass(classname); 
	}	   
});

$(function(){
  $(window).resize(function(){
    $('.block-content').equalHeights();
  }).trigger('resize');
});