// JavaScript Document
// Crafted carefully by Wahyu Hanafi LAD

$(function(){
	$(document).scroll(function(){
		var sc = $(document).scrollTop();
		
		if(sc > 100){
			$('#banner #scroll').hide();
		}else{
			$('#banner #scroll').show();
		}
		
		if(sc > 200){
			$('#header').addClass('scrolled');
		}else{
			$('#header').removeClass('scrolled');
		}
		
	});
	
	$('#space .center').cycle({fx:'scrollHorz', timeout:10000});
	$('#tweets_list').cycle({fx:'scrollHorz', timeout:5000});
	
	$('.vp').viewportChecker({classToAdd: 'visible', repeat:false});
	
	$('#services').viewportChecker({
		classToAdd: 'visible', 
		repeat:false,
		callbackFunction: function(elem, action){
			var i = 1;
			$('#services_list div').each(function(index, element){
				time = 100*i;
				setTimeout(function(){
					$(element).addClass('visible');
				},time);
				
				i++;
			});
		}
	});
	
	$('#our_work').viewportChecker({
		classToAdd: 'visible', 
		repeat:false,
		callbackFunction: function(elem, action){
			var i = 1;
			$('#work div.our_work').each(function(index, element){
				time = 100*i;
				setTimeout(function(){
					$(element).addClass('visible');
				},time);
				
				i++;
			});
		}
	});
	
	$('#about').viewportChecker({
		classToAdd: 'visible', 
		repeat:false,
		callbackFunction: function(elem, action){
			var i = 1;
			$('#about div.yolo').each(function(index, element){
				time = 100*i;
				setTimeout(function(){
					$(element).addClass('visible');
				},time);
				
				i++;
			});
		}
	});
	
	$('#members').viewportChecker({
		classToAdd: 'visible', 
		repeat:false,
		callbackFunction: function(elem, action){
			
			var i = 1;
			$('#members div.members_list').each(function(index, element){
				time = 100*i;
				setTimeout(function(){
					$(element).addClass('visible');
				},time);
				
				i++;
			});
		}
	});
	
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
		var t = target.offset().top;
		t = t - 60;
        $('html,body').animate({
		  scrollTop: t
        }, 2000, 'easeInOutCubic');
        return false;
      }
    }
  });
	
});