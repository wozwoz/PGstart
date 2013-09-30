var iscroller = [];
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

$(function()
{
	var t=setTimeout(function(){

	      $(".swrapper").each(function(jindex)
	      {

	      	var that = this;
			iscroller[jindex] = new IScroll('#wrapper-'+jindex, {
				scrollX: true,
				scrollY: false,
				momentum: true,
				snap: false,
				snapSpeed: 400,
				mouseWheel: false, 
				tap: true,
				keyBindings: true,
				click: true
			});
			$(this).find("a").each(function(index)
			{
				$($(this).parents(".menu").find("a").get(0)).addClass("test");
				$(this).attr("href", "javascript: iscroller["+jindex+"].scrollToElement($($('.scroller').get("+jindex+")).find('a').get("+index+"));");

				$(this).click(function()
				{
					$(that).find(".mySwipe").data("Swipe").slide(index, 400);
				     $(this).parents(".menu").find("a").removeClass('test');
		          		$(this).addClass('test');
				});
			});
			// pure JS
			$(this).find(".mySwipe").Swipe( {
			  // startSlide: 4,
			  // auto: 3000,
			  // continuous: true,
			  // disableScroll: true,
			  // stopPropagation: true,
			   callback: function(index, element) {
				if( index > -1 )
				{
					iscroller[jindex].scrollToElement($($('.scroller').get(jindex)).find('a').get(index));
					//$(that).find('.menu a').removeClass('test');
					$(that).find('.menu a').eq(index).click();
				}
			   },
			  // transitionEnd: function(index, element) {}
			});
	      });
	},500); 
});