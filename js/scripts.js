;(function(){
	
	"use strict";
	
	
	// set active link when scroll
	function setScrollActiveMenu() {

		// Cache selectors
		var lastId,
			topMenu = $(".navbar"),
			topMenuHeight = topMenu.outerHeight() + 0,
			// All list items
			menuItems = topMenu.find(".nav-link"),
			// Anchors corresponding to menu items
			scrollItems = menuItems.map(function () {
				var item = $($(this).attr("href"));
				if (item.length) {
					return item;
				}
			});

		// Bind click handler to menu items
		// so we can get a fancy scroll animation
		menuItems.click(function (e) {
			e.preventDefault();
			var href = $(this).attr("href"),
				offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
			$('html, body').stop().animate({
				scrollTop: offsetTop
			}, 500);
			
			
			 $('.navbar-collapse').collapse('hide');		

		});

		// Bind to scroll
		$(window).scroll(function () {
			// Get container scroll position
			var fromTop = $(this).scrollTop() + topMenuHeight;

			// Get id of current scroll item
			var cur = scrollItems.map(function () {
				if ($(this).offset().top < fromTop)
					return this;
			});
			// Get the id of the current element
			cur = cur[cur.length - 1];
			var id = cur && cur.length ? cur[0].id : "";

			if (lastId !== id) {
				lastId = id;
				// Set/remove active class
				menuItems
					.parent().removeClass("active")
					.end().filter("[href='#" + id + "']").parent().addClass("active");
			}
		});
		
	}
	setScrollActiveMenu();
	
	
	// scroll anchor
	$('.js-scroll').on('click', function(event) {	
		var sectionTo = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(sectionTo).offset().top + -45
		}, 500);
	});
	
	
})();	