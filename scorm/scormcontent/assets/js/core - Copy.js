/* 
	Core JavaScript Document
	Victoria Racing Club: Training Manaual
	By: Aakash Bhatia
	Email: akash.bhatia1184@gmail.com
	URI: http://www.thebrauxelcode.com/
*/

$(document).ready(function() {
	var pulsed1 = false;
	var pulsed2 = false;
	var finished = false;
	
	function pulsate1() {
		var propotion = pulsed1 ? '100%' : '90%';
		var opacity = pulsed1 ? '1' : '0.7';
		$('.on img, .about-us a.start-here img').animate({
			width: propotion,
			height: propotion,
			opacity: opacity
		}, 800, 'linear', function() {
				pulsed1 = !pulsed1;
			}
		);
		
		window.setTimeout(pulsate1, 800);
	}
	
	function pulsate2() {
		var propotion = pulsed2 ? '100%' : '90%';
		var opacity = pulsed2 ? '1' : '0.7';
		$('.on img').animate({
			width: propotion,
			height: propotion,
			opacity: opacity
		}, 800, 'linear', function() {
				pulsed2 = !pulsed2;
			}
		);
		
		window.setTimeout(pulsate2, 800);
	}
	
	pulsate1();
	
	$('.instructions-home-page').delay(300).toggle( "slide" );
	$('.instruction-set-video').delay(300).toggle('slide', {direction: "right"});
	
	$('nav a').click(function() {
		$('.instructions').delay(300).toggle( "slide" );
	});
	
	$('nav .inactive a').click(function() {
		return false;
	});
	
	$('.role-reveal').click(function() {
		$(this).hide();
		$(this).parent().find('.role-revealed').toggle("drop");
		
		return false;
	});
	
    // function to show our popups
    function showPopup(whichpopup){
        var docHeight = $(window).height() + 180; //grab the height of the page
        var scrollTop = $(window).scrollTop(); //grab the px value from the top of the page to where you're scrolling
        $('.overlay-bg').show().css({'height' : docHeight}); //display your popup background and set height to the page height
        $('.'+whichpopup).show().css({'top': scrollTop+20+'px'}); //show the appropriate popup and set the content 20px from the window top
		if( whichpopup == 'activity-popup' ) {
			$('.instructions-stud-to-sale-2').delay(300).toggle('slide', {direction: "right"});
			
			$('.question-fiorente').addClass('open-question').delay(300).toggle('slide', {direction: "right"});
		}
    }
 
    // function to close our popups
    function closePopup(popupVersion){
        $('.overlay-bg, .overlay-content').hide(); //hide the overlay
		$('.overlay-content iframe').attr('src', $('iframe').attr('src'));
		
		if( popupVersion == 'video-popup' ) {
			$('.video-play .activities-button').delay(100).removeClass('inactive');
			$('.stud-to-sale .activities-layout .activities-layout-content .vid .done').delay(100).fadeIn( 'fast' );
			$('.instruction-set-video').delay(300).toggle('slide', {direction: "right"});
			$('.instruction-set-activity').delay(1000).toggle('slide', {direction: "right"});
		}
    }
  
    // show popup when you click on the link
    $('.show-popup').click(function(event){
		if($(this).hasClass('inactive')) {
			return false;
		} else {
			event.preventDefault(); // disable normal link function so that it doesn't refresh the page
			var selectedPopup = $(this).data('showpopup'); //get the corresponding popup to show
			 
			showPopup(selectedPopup); //we'll pass in the popup number to our showPopup() function to show which popup we want
		}
    });
   
    // hide popup when user clicks on close button or if user clicks anywhere outside the container
    $('.close-btn, .overlay-bg, .closer').click(function() {
		if( $(this).parent().hasClass('video-popup') ) {
			var popupVersion = 'video-popup';
		} else {
			var popupVersion = 'not-video-popup';
		}
		if(finished) {
			$('.stud-to-sale .activities-layout .activities-layout-content .act .done').delay(100).fadeIn( 'fast' );
			$('.video-play .activities-button').addClass('inactive');
			$('.instruction-set-activity').delay(1000).toggle('slide', {direction: "right"});
			$('.instruction-set-final').delay(1000).toggle('slide', {direction: "right"});
		}
		
        closePopup(popupVersion);
    });
     
    // hide the popup when user presses the esc key
    $(document).keyup(function(e) {
        if (e.keyCode == 27) { // if user presses esc key
            closePopup();
        }
    });
	
	$('.answer-option .info').click(function() {
		var rel = $(this).attr('rel');

		$('.answer-option .info').each(function(index, element) {
            $(this).removeClass('active');
        });
		$(this).addClass('active');
		
		if( $('.info-block').hasClass('open') ) {
			$('.info-block').fadeOut(0);
			if( rel == 'homebred' ) {
				$('.info-block p').html('Retained by the breeder and sent to a trainer to be prepared for the races. In this case the owner is the breeder.');
			}
			if( rel == 'sales-yearling' ) {
				$('.info-block p').html('Sold by the breeder as a yearling at public auction. The trainer will usually be involved in the selection process.');
			}
			if( rel == 'tried-horse' ) {
				$('.info-block p').html('Bought via public auction or privately after having at least one preparation, most often having already raced at least once.');
			}
			$('.info-block').toggle('drop');
			
		} else {
			$('.info-block').addClass('open');
			$('.info-block').toggle('drop');
		}

		return false;
	});
	
	$('.answer-option .select').click(function() {
		$('.answer-option .info').each(function(index, element) {
            $(this).removeClass('active');
        });
		if( $('.info-block').hasClass('open') ) {
			$('.info-block').fadeOut(0);
		}
		var rel = 'question-fiorente';
		$('.open-question').each(function(index, element) {
        	rel = $(this).data('rel');
        });
		
		$('.answer-option .select').each(function(index, element) {
            $(this).removeClass('active');
        });
		$(this).addClass('active');
		
		if( rel == 'question-fiorente' ) {
			$(this).addClass('wrong');
			$('.answer-option .select.tried-horse').addClass('correct');
			$('.correct-answer .text').html('<p>Fiorente is a <strong>tried horse</strong>, bought privately and imported from the UK. Another recent example of a successful tried horse is Takeover Target, who was bought from an Australian sale.</p><p>The trainer will usually be involved in the selection process.</p>');
			
			$('.instructions-stud-to-sale-2').delay(300).toggle('slide', {direction: "right"});
		}

		if( rel == 'question-efficient' ) {
			$(this).addClass('wrong');
			$('.answer-option .select.sales-yearling').addClass('correct');
			$('.correct-answer .text').html('<p>Efficient was purchased as a <strong>sales yearling</strong> from New Zealand Bloodstock sale for $220,000 and imported to Australia.</p><p>Yearling sales are an important driver of the commercial aspects of thoroughbred racing, serving as the interface between breeders, owners and trainers.</p><p>The trainer is normally very involved in the selection process.</p>');			
		}

		if( rel == 'question-ethereal' ) {
			$(this).addClass('wrong');
			$('.answer-option .select.homebred').addClass('correct');
			$('.correct-answer .text').html('<p>Ethereal is a homebred; she was bred by Peter and Phillip Vela and retained by them to race.</p><p>Usually commercial breeders will sell some of their stock as weanlings or yearlings and retain some to race, due to their love of the sport and to enhance the commercial appeal of their stock.</p>');
		}
		
		$('.correct-answer').toggle('drop', {direction: "right"});
		
		return false;
	});
	
	$('.continue-button').click(function() {
		$('.answer-option .select').each(function(index, element) {
            $(this).removeClass('active').removeClass('correct').removeClass('wrong');
        });
		
		$('.correct-answer').fadeOut(0);
		
		if ( $('.question-fiorente').hasClass('open-question') ) {
			$('.question-fiorente').fadeOut(0);
			$('.question-efficient').toggle('drop', {direction: "right"});
		} 
		if ( $('.question-efficient').hasClass('open-question') ) {
			$('.question-efficient').fadeOut(0);
			$('.question-ethereal').toggle('drop', {direction: "right"});
		}
		
		if($('.question-ethereal').hasClass('finished')) {
			$('.overlay-bg, .overlay-content').hide();
			$('.stud-to-sale .activities-layout .activities-layout-content .act .done').delay(100).fadeIn( 'fast' );
			$('.video-play .activities-button').addClass('inactive');
			$('.instruction-set-activity').delay(1000).toggle('slide', {direction: "right"});
			$('.instruction-set-final').delay(1000).toggle('slide', {direction: "right"});
		}

		if($('.question-ethereal').hasClass('open-question')) {
			$('.instructions-stud-to-sale-feedback').toggle('drop', {direction: "right"});
			$('.question-ethereal').addClass('finished');
			finished = true;
		}

		if ( $('.question-efficient').hasClass('open-question') ) {
			$('.question-ethereal').addClass('open-question');
			$('.question-efficient').removeClass('open-question');
		}
		if ( $('.question-fiorente').hasClass('open-question') ) {
			$('.question-efficient').addClass('open-question');
			$('.question-fiorente').removeClass('open-question')
		}

		return false;
	});
	
	$('.inactive').click(function() {
		return false;
	});
	
});

/*
	(function pulse(back, i) {
		var el = $('.on img'),
			wd = back    ? 5 : -5,
			op = back    ? 0.8  : 0.5,
			de = i%4!==0 ? 0  : 1400;
	
		el.delay(de).animate({
			width   : el.width() + (wd), opacity : op
		}, 500, function() {
			pulse(!back, ++i);
		});
	})(false, 0);

	(function pulse(back, i) {
		var el = $('.on img, .about-us a.start-here img'),
			wd = back    ? 5 : -5,
			op = back    ? 0.8  : 0.5,
			de = i%4!==0 ? 0  : 1400;
	
		el.delay(de).animate({
			width   : el.width() + (wd), opacity : op
		}, 800, function() {
			pulse(!back, ++i);
		});
	})(false, 0);
*/