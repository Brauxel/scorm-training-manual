$(document).ready(function() {
	var pulsed = false;
	var pulsed1 = false;
	var pulsed2 = false;
	var pulsed3 = false;
	var pulsed4 = false;
	var pulsed5 = false;
	var finished = false;
	var q1 = true;
	var q2 = false;
	var q3 = false;
	var iToggle = true;
	var hgclose = false;
	var racePrepVid1 = false;
	var racePrepVid2 = false;
	var racePrepQ = 0;
	var raceDayCorrect = false;
	var raceDayActivity = false;
	var raceDayActivityCount = 0;
	var whatHappenCount = 0;
	var WhatHappen3 = 0;
	var WhatHappen3Count = 0;
	var WhathappensComplete = false;
	var TypicatrainginComplete = false;
	var TypicaltrainingCount = 0;
	var TypicaltrainingCountIn = 0;
	var afterTheRaceCount = 0;
	var afterTheRaceComplete = false;
	var winnersCirlce = 0;
	
	function pulsate() {
		var propotion = pulsed ? '100%' : '90%';
		var opacity = pulsed ? '1' : '0.7';
		$('.on img, .about-us a.start-here img').animate({
			width: propotion,
			height: propotion,
			opacity: opacity
		}, 800, 'linear', function() {
				pulsed = !pulsed;
			}
		);
		
		window.setTimeout(pulsate, 800);
	}
	function pulsate1() {
		var propotion1 = pulsed1 ? '100%' : '90%';
		var opacity1 = pulsed1 ? '1' : '0.7';
		$('.on2 img').animate({
			width: propotion1,
			height: propotion1,
			opacity: opacity1
		}, 800, 'linear', function() {
				pulsed1 = !pulsed1;
			}
		);
		
		window.setTimeout(pulsate1, 800);
	}
	function pulsate2() {
		var propotion2 = pulsed2 ? '100%' : '90%';
		var opacity2 = pulsed2 ? '1' : '0.7';
		$('.on3 img').animate({
			width: propotion2,
			height: propotion2,
			opacity: opacity2
		}, 800, 'linear', function() {
				pulsed2 = !pulsed2;
			}
		);
		
		window.setTimeout(pulsate2, 800);
	}

	function pulsate3() {
		var propotion3 = pulsed3 ? '100%' : '90%';
		var opacity3 = pulsed3 ? '1' : '0.7';
		$('.on4 img').animate({
			width: propotion3,
			height: propotion3,
			opacity: opacity3
		}, 800, 'linear', function() {
				pulsed3 = !pulsed3;
			}
		);
		
		window.setTimeout(pulsate3, 800);
	}
	
	function pulsate4() {
		var propotion4 = pulsed4 ? '100%' : '90%';
		var opacity4 = pulsed4 ? '1' : '0.7';
		$('.on5 img').animate({
			width: propotion4,
			height: propotion4,
			opacity: opacity4
		}, 800, 'linear', function() {
				pulsed4 = !pulsed4;
			}
		);
		
		window.setTimeout(pulsate4, 800);
	}
	
	function pulsate5() {
		var propotion5 = pulsed5 ? '100%' : '90%';
		var opacity5 = pulsed5 ? '1' : '0.7';
		$('.on6 img').animate({
			width: propotion5,
			height: propotion5,
			opacity: opacity5
		}, 800, 'linear', function() {
				pulsed5 = !pulsed5;
			}
		);
		
		window.setTimeout(pulsate5, 800);
	}
	
	pulsate();
	pulsate1();
	pulsate2();
	pulsate3();
	pulsate4();
	pulsate5();
	
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
        var docHeight = $(window).height() + 300; //grab the height of the page
        var scrollTop = $(window).scrollTop(); //grab the px value from the top of the page to where you're scrolling
		if( whichpopup == 'glossary-popup' ) {
			docHeight = $(window).height() + 1150;
		}
		if( whichpopup == 'help-popup' ) {
			docHeight = $(window).height() + 350;
		}
        $('.overlay-bg').show().css({'height' : docHeight}); //display your popup background and set height to the page height
        $('.'+whichpopup).show().css({'top': 10+'px'}); //show the appropriate popup and set the content 20px from the window top
		if( whichpopup == 'activity-popup' || whichpopup == 'raceday-activity' || whichpopup == 'race-prep-activity') {
			if(iToggle) {
				$('.instructions-stud-to-sale-2').delay(300).toggle('slide', {direction: "right"});
			}
			
			$('.instruction-set-activity').addClass('superhide');
		}
		
		if( whichpopup == 'race-prep-activity' ) {
		}
		if( whichpopup == 'raceday-activity' ) {
			if(!raceDayActivity) {
				$('.raceday-answer').first().toggle( 'drop' );
				raceDayActivity = !raceDayActivity;
			}
		}
    }
 
    // function to close our popups
    function closePopup(popupVersion) {
		if( popupVersion == 'help-popup' ) {
			$('.overlay-bg, .help-popup').hide(); //hide the overlay
			$('.overlay-content iframe').attr('src', $('iframe').attr('src'));
		}

		if( popupVersion == 'activity-popup' ) {
			$('.overlay-bg, .overlay-content').hide(); //hide the overlay
			$('.overlay-content iframe').attr('src', $('iframe').attr('src'));
		}

		if( popupVersion == 'glossary-popup' ) {
			$('.overlay-bg, .glossary-popup').hide(); //hide the overlay
			$('.overlay-content iframe').attr('src', $('iframe').attr('src'));
		}
		
		if( popupVersion == 'video-popup' ) {
	        $('.overlay-bg, .overlay-content').hide(); //hide the overlay
			if(!finished) {
				$('.video-play .activities-button').delay(100).removeClass('inactive');
				$('.instruction-set-video').delay(300).toggle('slide', {direction: "right"});
				$('.instruction-set-activity').delay(1000).toggle('slide', {direction: "right"});
			}
			$('.stud-to-sale-2 .activities-layout .activities-layout-content .vid .done').delay(100).fadeIn( 'fast' );
		}

		if( popupVersion == 'after-the-race-video' ) {
	        $('.overlay-bg, .overlay-content').hide(); //hide the overlay
			if(!finished) {
				$('.video-play .activities-button').delay(100).removeClass('inactive');
				$('.instruction-set-video').delay(300).toggle('slide', {direction: "right"});
				$('.instruction-set-activity').delay(1000).toggle('slide', {direction: "right"});
			}
			$('.after-the-race .vid .done').delay(100).fadeIn( 'fast' );
		}

		if( popupVersion == 'winners-circle-video' ) {
	        $('.overlay-bg, .overlay-content').hide(); //hide the overlay
			if(!finished) {
				$('.video-play .activities-button').delay(100).removeClass('inactive');
				$('.instruction-set-video').delay(300).toggle('slide', {direction: "right"});
				$('.instruction-set-activity').delay(1000).toggle('slide', {direction: "right"});
			}
			$('.winners-circle .vid .done').delay(100).fadeIn( 'fast' );
		}

		if( popupVersion == 'race-prep-vid-1' ) {
			racePrepVid1 = true;
	        $('.overlay-bg, .overlay-content').hide(); //hide the overlay
			$('.stud-to-sale .activities-layout .race-prep-content-1 .activities-layout-content .vid .done').delay(100).fadeIn( 'fast' );
		}

		if( popupVersion == 'race-prep-vid-2' ) {
			racePrepVid2 = true;
	        $('.overlay-bg, .overlay-content').hide(); //hide the overlay
			$('.stud-to-sale .activities-layout .race-prep-content-2 .activities-layout-content .vid .done').delay(100).fadeIn( 'fast' );
		}

		if( popupVersion == 'race-prep-activity' ) {
	        $('.overlay-bg, .overlay-content').hide(); //hide the overlay
		}
		
		if(racePrepVid1 && racePrepVid2) {
			$('.stud-to-sale .video-play .activities-button').delay(100).removeClass('inactive');
			$('.instruction-set-video').delay(1000).toggle('slide', {direction: "right"});
			$('.instruction-set-video').addClass('superhide');
			$('.instruction-set-activity').delay(1000).toggle('slide', {direction: "right"});
		}
		
		if(racePrepQ == 3) {
			$('.instruction-set-activity').delay(1000).toggle('slide', {direction: "right"});
			$('.instruction-set-activity').addClass('superhide');
			$('.instruction-set-final').delay(1000).toggle('slide', {direction: "right"});
			$('.stud-to-sale .activities-layout .activities-layout-right .activities-layout-content .act .done').delay(100).fadeIn( 'fast' );
			$('.video-play .activities-button').delay(100).addClass('inactive');
		}
		
		if(raceDayActivityCount == 11) {
			$('.activities-button').delay(100).addClass('inactive');
		}

		if(WhathappensComplete) {
			$('.activities-button').delay(100).addClass('inactive');
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
		}
		if( $(this).parent().hasClass('activity-popup') ) {
			var popupVersion = 'activity-popup';
		}
		if( $(this).parent().hasClass('glossary-popup') ) {
			var popupVersion = 'glossary-popup';
			hgclose = true;
		}
		if( $(this).parent().hasClass('help-popup') ) {
			var popupVersion = 'help-popup';
			hgclose = true;
		}
		if( $(this).parent().hasClass('after-the-race-video') ) {
			var popupVersion = 'after-the-race-video';
			hgclose = true;
		}
		if( $(this).parent().hasClass('winners-circle-video') ) {
			var popupVersion = 'winners-circle-video';
			hgclose = true;
		}
		if( $(this).parent().hasClass('race-prep-vid-1') ) {
			var popupVersion = 'race-prep-vid-1';
		}
		if( $(this).parent().hasClass('race-prep-vid-2') ) {
			var popupVersion = 'race-prep-vid-2';
		}
		if( $(this).parent().hasClass('race-prep-activity') ) {
			var popupVersion = 'race-prep-activity';
		}
		if(finished) {
			$('.stud-to-sale-2 .activities-layout .activities-layout-content .act .done').delay(100).fadeIn( 'fast' );
			$('.video-play .activities-button').addClass('inactive');
			/*$('.instruction-set-activity').delay(1000).toggle('slide', {direction: "right"});*/
			$('.instruction-set-activity').addClass('superhide');
			$('.instruction-set-final').delay(1000).toggle('slide', {direction: "right"});
		}
		
		if( q1 == true && hgclose == false ) {
			$('.question-fiorente').addClass('open-question').delay(300).toggle('slide', {direction: "right"});
		}
		if( q2 == true && hgclose == false ) {
			$('.question-efficient').addClass('open-question').delay(300).toggle('slide', {direction: "right"});
		}
		if( q3 == true && hgclose == false ) {
			$('.question-ethereal').addClass('open-question').delay(300).toggle('slide', {direction: "right"});
		}
		
		if($(this).attr('rel') == 'help') {
		}
		
		if(raceDayActivityCount == 11) {
			$('.raceday .activities-layout .activities-layout-content .act .done').delay(100).fadeIn( 'fast' );
			/*$('.instruction-set-activity').delay(1000).toggle('slide', {direction: "right"});*/
			$('.instruction-set-activity').addClass('superhide');
			$('.instruction-set-final').delay(1000).toggle('slide', {direction: "right"});
		}
		
		if(WhathappensComplete) {
			$('.act .done').delay(100).fadeIn( 'fast' );
			/*$('.instruction-set-activity').delay(1000).toggle('slide', {direction: "right"});*/
			$('.instruction-set-activity').addClass('superhide');
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
			
			q1 = false;
			q2 = true;
			iToggle = false;
		}

		if( rel == 'question-efficient' ) {
			$(this).addClass('wrong');
			$('.answer-option .select.sales-yearling').addClass('correct');
			$('.correct-answer .text').html('<p>Efficient was purchased as a <strong>sales yearling</strong> from New Zealand Bloodstock sale for $220,000 and imported to Australia.</p><p>Yearling sales are an important driver of the commercial aspects of thoroughbred racing, serving as the interface between breeders, owners and trainers.</p><p>The trainer is normally very involved in the selection process.</p>');
			
			q2 = false;
			q3 = true;
		}

		if( rel == 'question-ethereal' ) {
			$(this).addClass('wrong');
			$('.answer-option .select.homebred').addClass('correct');
			$('.correct-answer .text').html('<p>Ethereal is a homebred; she was bred by Peter and Phillip Vela and retained by them to race.</p><p>Usually commercial breeders will sell some of their stock as weanlings or yearlings and retain some to race, due to their love of the sport and to enhance the commercial appeal of their stock.</p>');
			
			q3 = false;
		}
		
		$('.correct-answer').toggle('drop', {direction: "right"});
		$('.activity-popup .close-btn').css('display','none');
		
		return false;
	});
	
	$('.continue-button').click(function() {
		$('.activity-popup .close-btn').css('display','block');

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
			$('.stud-to-sale-2 .activities-layout .activities-layout-content .act .done').delay(100).fadeIn( 'fast' );
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
	
	/* Race Prep code */
	$('.race-prep-answer').draggable({
		revert: true
	});

    $( '.race-prep-question' ).droppable({
      drop: function( event, ui ) {
		  if($(ui.draggable).data('rel') == $(this).data('rel')) {
			  $(ui.draggable).fadeOut('fast');
			  $('.instructions-race-prep-activity').toggle('slide');
			  $('.instructions-race-prep-activity').addClass('superhide');
			  $(this).find('p').find('span').find('strong').fadeIn('fast');
			  racePrepQ++;
			  if(racePrepQ == 3) {
				  $('.race-prep-feedback-trainer').toggle('drop', {direction: "right"});
				  $('.instructions-race-prep-final').delay(3000).toggle('slide');
			  }
		  }
      }
    });
	
	/* Raceday code */
	$('.raceday-answer img').draggable({
		revert: true
	});

    $( '.raceday-question' ).droppable({
      drop: function( event, ui ) {
		  raceDayActivityCount++;
		  
		  if($(this).hasClass('highlighted')) {
			  $(this).find('.outer-circle').addClass('high-active', {duration:500});
			  $(this).find('.circle').animate({
				  backgroundColor: "#EC3A94",
				  borderColor: "#fff"
			  }, 500);
		  } else {
			  $(this).find('.outer-circle').addClass('active', {duration:500});
			  $(this).find('.circle').animate({
				  backgroundColor: "#155f9c",
				  borderColor: "#fff"
			  }, 500);
		  }

		  $(ui.draggable).parent().fadeOut(0);
		  var s = '#' + $(ui.draggable).data('rel') + ' .feedback';
		  raceDayActivity = true;
		  $(s).toggle( 'drop' );
		  /*$(ui.draggable).parent().next().toggle('drop');*/
		  $(ui.draggable).parent().next().addClass( 'this-is-it' );

		  if($(ui.draggable).data('rel') == $(this).attr("id")) {
			  raceDayCorrect = true;
		  } else {
			  raceDayCorrect = false;
		  }
		  
		  $('.raceday .instructions-raceday-activity').toggle('drop', {direction: "bottom"});
		  $('.raceday .instructions.instructions-raceday-activity').addClass('superhide');
      }
    });
	
	$('.raceday .feedback .close').click(function() {
		$('.outer-circle.active .circle').animate({
			backgroundColor : "#fff",
			borderColor : "#155f9c" 
		}, 300);
		$('.outer-circle.high-active .circle').animate({
			backgroundColor : "#fff",
			borderColor : "#EC3A94" 
		}, 300);
		$('.outer-circle.active').removeClass('active', {duration: 300});
		$('.outer-circle.high-active').removeClass('high-active', {duration: 300});
		$('.this-is-it').toggle('drop').removeClass('this-is-it');
		
		if(raceDayCorrect) {
			$(this).parent().parent().find('.correct-answer-img').fadeIn('fast');
		} else {
			$(this).parent().parent().find('.wrong-answer-img').fadeIn('fast');
		}
		$(this).parent().toggle( 'drop' );
		
		if(raceDayActivityCount == 11) {
			$('.raceday .instructions-raceday-final').toggle('slide', {direction: "right"});
		}

		return false;
	});
	
	/* Training at flemington code */
	$('.training-at-flemington .answer a').click(function(){ 
		return false;
	});
	
	$('.training-at-flemington .answer .ans').draggable({
		revert: true
	});

    $( '.training-day-question' ).droppable({
      drop: function( event, ui ) {
		  
		  $(ui.draggable).fadeOut('fast');
		  whatHappenCount++;
		  if($(this).hasClass('one')) {
			  $(this).find('.answer-holder').addClass('activated', {duration: 200});
			  $('.instructions-raceday-activity').fadeOut( 'fast' );
			  
			  if($(ui.draggable).data('rel') == 'right-answer') {
				  $('.feedback-text.correct-answer.one').toggle( 'drop' );
				  $('.circle.one p').fadeOut(0);
				  $('.circle.one .correct-answer-img').fadeIn('fast');
			  } else {
				  $('.feedback-text.wrong-answer.one').toggle( 'drop' );
				  $('.circle.one p').fadeOut(0);
				  $('.circle.one .correct-answer-img').fadeIn('fast');
			  }
		  }
		  
		  if($(this).hasClass('two')) {
			  $(this).find('.answer-holder').addClass('activated', {duration: 200});
			  
			  if($(ui.draggable).data('rel') == 'right-answer') {
				  $('.feedback-text.correct-answer.two').toggle( 'drop' );
				  $('.circle.two p').fadeOut(0);
				  $('.circle.two .correct-answer-img').fadeIn('fast');
			  } else {
				  $('.feedback-text.wrong-answer.two').toggle( 'drop' );
				  $('.circle.two p').fadeOut(0);
				  $('.circle.two .correct-answer-img').fadeIn('fast');
			  }
		  }
		  
		  if($(this).hasClass('three')) {
			  WhatHappen3Count++;
			  if($(ui.draggable).data('rel') == 'right-answer') {
				  WhatHappen3++;
				  
				  if(WhatHappen3 == 1) {
					  if($(ui.draggable).attr('id') == 'swimming') {
						  $(this).find('.1').text('Swimming').addClass('activated', {duration: 200});
					  }

					  if($(ui.draggable).attr('id') == 'beach-walker') {
						  $(this).find('.1').text('Beach Walker').addClass('activated', {duration: 200});
					  }

					  if($(ui.draggable).attr('id') == 'trot') {
						  $(this).find('.1').text('Trotting & cantering').addClass('activated', {duration: 200});
					  }

					  if($(ui.draggable).attr('id') == 'treadmill') {
						  $(this).find('.1').text('Treadmill').addClass('activated', {duration: 200});
					  }

					  if($(ui.draggable).attr('id') == 'walker') {
						  $(this).find('.1').text('Walker').addClass('activated', {duration: 200});
					  }
					  
					  
				  }
				  
				  if(WhatHappen3 == 2) {
					  if($(ui.draggable).attr('id') == 'swimming') {
						  $(this).find('.2').text('Swimming').addClass('activated', {duration: 200});
					  }

					  if($(ui.draggable).attr('id') == 'beach-walker') {
						  $(this).find('.2').text('Beach Walker').addClass('activated', {duration: 200});
					  }

					  if($(ui.draggable).attr('id') == 'trot') {
						  $(this).find('.2').text('Trotting & cantering').addClass('activated', {duration: 200});
					  }

					  if($(ui.draggable).attr('id') == 'treadmill') {
						  $(this).find('.2').text('Treadmill').addClass('activated', {duration: 200});
					  }

					  if($(ui.draggable).attr('id') == 'walker') {
						  $(this).find('.2').text('Walker').addClass('activated', {duration: 200});
					  }
					  
				  }

				  if(WhatHappen3 == 3) {
					  if($(ui.draggable).attr('id') == 'swimming') {
						  $(this).find('.3').text('Swimming').addClass('activated', {duration: 200});
					  }

					  if($(ui.draggable).attr('id') == 'beach-walker') {
						  $(this).find('.3').text('Beach Walker').addClass('activated', {duration: 200});
					  }

					  if($(ui.draggable).attr('id') == 'trot') {
						  $(this).find('.3').text('Trotting & cantering').addClass('activated', {duration: 200});
					  }

					  if($(ui.draggable).attr('id') == 'treadmill') {
						  $(this).find('.3').text('Treadmill').addClass('activated', {duration: 200});
					  }

					  if($(ui.draggable).attr('id') == 'walker') {
						  $(this).find('.3').text('Walker').addClass('activated', {duration: 200});
					  }

				  }
				  
			  } else {
			  }
			  
			  if(WhatHappen3Count == 3) {
				  if(WhatHappen3 == 3) {
					  $('.feedback-text.correct-answer.three').toggle( 'drop' );
					  $('.circle.three p').fadeOut(0);
					  $('.circle.three .correct-answer-img').fadeIn('fast');
				  } else {
					  $('.feedback-text.correct-answer.three').toggle( 'drop' );
					  $('.circle.three p').fadeOut(0);
					  $('.circle.three .correct-answer-img').fadeIn('fast');
				  }
			  }
		  }

		  if($(this).hasClass('four')) {
			  $(this).find('.answer-holder').addClass('activated', {duration: 200});
			  
			  if($(ui.draggable).data('rel') == 'right-answer') {
				  $('.feedback-text.correct-answer.four').toggle( 'drop' );
				  $('.circle.four p').fadeOut(0);
				  $('.circle.four .correct-answer-img').fadeIn('fast');
			  } else {
				  $('.feedback-text.wrong-answer.four').toggle( 'drop' );
				  $('.circle.four p').fadeOut(0);
				  $('.circle.four .correct-answer-img').fadeIn('fast');
			  }
		  }
		  
	  	}
    });
	
	$('.continue-button').click(function() {
		var rel = $(this).attr('rel');
		if(rel == 'two') {
			$('.feedback-text.one').fadeOut( 'fast' );
			$('.training-day-question.one').toggle( 'drop' );
			$('.answer.one').toggle( 'drop' );
			$('.training-day-question.two').delay(400).toggle( 'drop' );
			$('.answer.two').delay(400).toggle( 'drop' );
		}

		if(rel == 'three') {
			$('.feedback-text.two').fadeOut( 'fast' );
			$('.training-day-question.two').toggle( 'drop' );
			$('.answer.two').toggle( 'drop' );
			$('.training-day-question.three').delay(400).toggle( 'drop' );
			$('.answer.three').delay(400).toggle( 'drop' );
		}

		if(rel == 'four') {
			$('.feedback-text.three').fadeOut( 'fast' );
			$('.training-day-question.three').toggle( 'drop' );
			$('.answer.three').toggle( 'drop' );
			$('.training-day-question.four').delay(400).toggle( 'drop' );
			$('.answer.four').delay(400).toggle( 'drop' );
		}
		if(rel == 'five') {
			$('.marking').css('margin-top','0px');
			$('.feedback-text.four').fadeOut( 'fast' );
			$('.training-day-question.four').toggle( 'drop' );
			$('.answer.four').toggle( 'drop' );
			$('.training-day-final-question-feedback').delay(400).toggle( 'drop' );

			$('.instructions-raceday-final').toggle('slide');
			$('.answers').css('display','none');
			$('.training-day-feedback').css('display','none');
			WhathappensComplete = true;
		}
		return false;
	});
	
	/* Typical Training Day */
	$('.typical-training-day .answer').click(function(){
		return false;
	});
	
	$('.typical-training-day .answer').draggable({
		revert: true
	});

	$( '.typical-training-day.questions a' ).droppable({
		  drop: function( event, ui ) {
			  

			  if(TypicaltrainingCount ==6) {
				  if($(ui.draggable).data('rel') == $(this).attr('id')) {
					  $(this).text('Light exercise');
					  $(this).addClass('activated', {duration:'fast'});
					  TypicaltrainingCount++;
					  if(TypicaltrainingCountIn == 8) {
						  $('.feedback-wrong-seven').fadeOut(0);
					  }
					  TypicaltrainingCountIn++;
					  $('.feedback-right-seven').toggle('drop');
					  $(ui.draggable).toggle('drop');
				  } else {
					  if(TypicaltrainingCountIn == 8) {
						  $('.' + $(ui.draggable).data('rel')).text('Light exercise');
						  $('.' + $(ui.draggable).data('rel')).addClass('activated', {duration: 'fast'});
						  $('.feedback-wrong-seven').fadeOut(0);
						  $('.feedback-right-seven').toggle('drop');
						  $(ui.draggable).toggle('drop');
						  TypicaltrainingCount++;
					  }
					  if(TypicaltrainingCountIn == 7) {
						  TypicaltrainingCountIn++;
						  $('.feedback-wrong-seven').toggle('drop');
					  } 
				  }
			  }
			  
			  if(TypicaltrainingCount == 5) {
				  if($(ui.draggable).data('rel') == $(this).attr('id')) {
					  $(this).text('Feed, rug, dress');
					  $(this).addClass('activated', {duration:'fast'});
					  TypicaltrainingCount++;
					  if(TypicaltrainingCountIn == 7) {
						  $('.feedback-wrong-six').fadeOut(0);
					  }
					  TypicaltrainingCountIn++;
					  $('.feedback-right-six').toggle('drop');
					  $(ui.draggable).toggle('drop');
				  } else {
					  if(TypicaltrainingCountIn == 7) {
						  $('.' + $(ui.draggable).data('rel')).text('Feed, rug, dress');
						  $('.' + $(ui.draggable).data('rel')).addClass('activated', {duration: 'fast'});
						  $('.feedback-wrong-six').fadeOut(0);
						  $('.feedback-right-six').toggle('drop');
						  $(ui.draggable).toggle('drop');
						  TypicaltrainingCount++;
					  }
					  if(TypicaltrainingCountIn == 6) {
						  TypicaltrainingCountIn++;
						  $('.feedback-wrong-six').toggle('drop');
					  } 
				  }
			  }

			  if(TypicaltrainingCount == 4) {
				  if($(ui.draggable).data('rel') == $(this).attr('id')) {
					  $(this).text('Small Feed');
					  $(this).addClass('activated', {duration:'fast'});
					  TypicaltrainingCount++;
					  if(TypicaltrainingCountIn == 6) {
						  $('.feedback-wrong-five').fadeOut(0);
					  }
					  TypicaltrainingCountIn++;
					  $('.feedback-right-five').toggle('drop');
					  $(ui.draggable).toggle('drop');
				  } else {
					  if(TypicaltrainingCountIn == 6) {
						  $('.' + $(ui.draggable).data('rel')).text('Small Feed');
						  $('.' + $(ui.draggable).data('rel')).addClass('activated', {duration: 'fast'});
						  $('.feedback-wrong-five').fadeOut(0);
						  $('.feedback-right-five').toggle('drop');
						  $(ui.draggable).toggle('drop');
						  TypicaltrainingCount++;
					  }
					  if(TypicaltrainingCountIn == 5) {
						  TypicaltrainingCountIn++;
						  $('.feedback-wrong-five').toggle('drop');
					  } 
				  }
			  }

			  if(TypicaltrainingCount == 3) {
				  if($(ui.draggable).data('rel') == $(this).attr('id')) {
					  $(this).text('Wash or swim');
					  $(this).addClass('activated', {duration:'fast'});
					  TypicaltrainingCount++;
					  if(TypicaltrainingCountIn == 5) {
						  $('.feedback-wrong-four').fadeOut(0);
					  }
					  TypicaltrainingCountIn++;
					  $('.feedback-right-four').toggle('drop');
					  $(ui.draggable).toggle('drop');
				  } else {
					  if(TypicaltrainingCountIn == 5) {
						  $('.' + $(ui.draggable).data('rel')).text('Wash or swim');
						  $('.' + $(ui.draggable).data('rel')).addClass('activated', {duration: 'fast'});
						  $('.feedback-wrong-four').fadeOut(0);
						  $('.feedback-right-four').toggle('drop');
						  $(ui.draggable).toggle('drop');
						  TypicaltrainingCount++;
					  }
					  if(TypicaltrainingCountIn == 4) {
						  TypicaltrainingCountIn++;
						  $('.feedback-wrong-four').toggle('drop');
					  } 
				  }
			  }

			  if(TypicaltrainingCount == 2) {
				  if($(ui.draggable).data('rel') == $(this).attr('id')) {
					  $(this).text('Tacked Up');
					  $(this).addClass('activated', {duration:'fast'});
					  TypicaltrainingCount++;
					  if(TypicaltrainingCountIn == 4) {
						  $('.feedback-wrong-three').fadeOut(0);
					  }
					  TypicaltrainingCountIn++;
					  $('.feedback-right-three').toggle('drop');
					  $(ui.draggable).toggle('drop');
				  } else {
					  if(TypicaltrainingCountIn == 4) {
						  $('.' + $(ui.draggable).data('rel')).text('Tacked Up');
						  $('.' + $(ui.draggable).data('rel')).addClass('activated', {duration: 'fast'});
						  $('.feedback-wrong-three').fadeOut(0);
						  $('.feedback-right-three').toggle('drop');
						  $(ui.draggable).toggle('drop');
						  TypicaltrainingCount++;
					  }
					  if(TypicaltrainingCountIn == 3) {
						  TypicaltrainingCountIn++;
						  $('.feedback-wrong-three').toggle('drop');
					  } 
				  }
			  }

			  if(TypicaltrainingCount == 1) {
				  if($(ui.draggable).data('rel') == $(this).attr('id')) {
					  $(this).text('Work to track');
					  $(this).addClass('activated', {duration:'fast'});
					  TypicaltrainingCount++;
					  if(TypicaltrainingCountIn == 3) {
						  $('.feedback-wrong-two').fadeOut(0);
					  }
					  TypicaltrainingCountIn++;
					  $('.feedback-right-two').toggle('drop');
					  $(ui.draggable).toggle('drop');
				  } else {
					  if(TypicaltrainingCountIn == 3) {
						  $('.' + $(ui.draggable).data('rel')).text('Work to track');
						  $('.' + $(ui.draggable).data('rel')).addClass('activated', {duration: 'fast'});
						  $('.feedback-wrong-two').fadeOut(0);
						  $('.feedback-right-two').toggle('drop');
						  $(ui.draggable).toggle('drop');
						  TypicaltrainingCount++;
					  }
					  if(TypicaltrainingCountIn == 2) {
						  TypicaltrainingCountIn++;
						  $('.feedback-wrong-two').toggle('drop');
					  } 
				  }
			  }
			  
			  if(TypicaltrainingCount == 0) {
				  $('.typical-training-day .instructions-raceday-activity').toggle('drop');
				  $('.typical-training-day .instructions-raceday-activity').addClass('superhide');
				  if($(ui.draggable).data('rel') == $(this).attr('id')) {
					  $(this).text('Final feed');
					  $(this).addClass('activated', {duration:'fast'});
					  TypicaltrainingCount++;
					  if(TypicaltrainingCountIn == 1) {
						  $('.feedback-wrong-one').fadeOut(0);
					  }
					  TypicaltrainingCountIn = TypicaltrainingCountIn + 2;
					  $('.feedback-right-one').toggle('drop');
					  $(ui.draggable).toggle('drop');
				  } else {
					  if(TypicaltrainingCountIn == 1) {
						  $('.' + $(ui.draggable).data('rel')).text('Final feed');
						  $('.' + $(ui.draggable).data('rel')).addClass('activated', {duration: 'fast'});
						  $('.feedback-wrong-one').fadeOut(0);
						  $('.feedback-right-one').toggle('drop');
						  $(ui.draggable).toggle('drop');
						  TypicaltrainingCount++;
						  TypicaltrainingCountIn++;
					  }
					  if(TypicaltrainingCountIn == 0) {
						  TypicaltrainingCountIn++;
						  $('.feedback-wrong-one').toggle('drop');
					  } 
				  }
			  }
		  }
	});
	
	$('.typical-training-day .feedback .continue-button').click(function() {
		if(TypicaltrainingCount == 1) {
			$('.answer.two').toggle('drop');
		}

		if(TypicaltrainingCount == 2) {
			$('.answer.three').toggle('drop');
		}

		if(TypicaltrainingCount == 3) {
			$('.answer.four').toggle('drop');
		}

		if(TypicaltrainingCount == 4) {
			$('.answer.five').toggle('drop');
		}

		if(TypicaltrainingCount == 5) {
			$('.answer.six').toggle('drop');
		}

		if(TypicaltrainingCount == 6) {
			$('.answer.seven').toggle('drop');
		}
		if(TypicaltrainingCount == 7) {
			$('.typical-training-day .instructions-raceday-final').toggle('drop');
			WhathappensComplete = true;
		}

		
		$(this).parent().fadeOut('fast');
		
	});
	
	/* After the Race Page Styles */
	$('.after-the-race .answer').draggable({
		revert: true
	});
	
	$('.question-mark').mouseenter(function(){
		$(this).parent().find('.after-the-race-feedback').slideDown('fast');
	});

	$('.question-mark').mouseleave(function(){
		$(this).parent().find('.after-the-race-feedback').slideUp('fast');
	});

	$( '.after-the-race .question' ).droppable({
		  drop: function( event, ui ) {
			  if( afterTheRaceCount == 3 ) {
				  if( $(this).data('rel') == $(ui.draggable).data('rel') ) {
					  afterTheRaceCount++;
					  $(this).find('.answer-area').addClass( 'activated', {duration: 'fast'});
					  $('.instructions-stud-to-sale-feedback').toggle('drop', {direction: "right"});
					  WhathappensComplete = true;
				  }
			  }

			  if( afterTheRaceCount == 2 ) {
				  if( $(this).data('rel') == $(ui.draggable).data('rel') ) {
					  afterTheRaceCount++;
					  $(this).find('.answer-area').addClass( 'activated', {duration: 'fast'});
					  
					  $(this).delay(1000).toggle('drop');
					  
					  $('.after-the-race .question.four').delay(1300).toggle('drop');
				  }
			  }

			  if( afterTheRaceCount == 1 ) {
				  if( $(this).data('rel') == $(ui.draggable).data('rel') ) {
					  afterTheRaceCount++;
					  $(this).find('.answer-area').addClass( 'activated', {duration: 'fast'});
					  
					  $(this).delay(1000).toggle('drop');
					  
					  $('.after-the-race .question.three').delay(1300).toggle('drop');
				  }
			  }
			  			  
			  if( afterTheRaceCount == 0 ) {
				  if( $(this).data('rel') == $(ui.draggable).data('rel') ) {
					  afterTheRaceCount++;
					  $(this).find('.answer-area').addClass( 'activated', {duration: 'fast'});
					  $('.instructions-stud-to-sale-2').toggle('drop', {direction: "right"});
					  $('.instructions-stud-to-sale-2').addClass('superhide');
					  
					  $(this).delay(1000).toggle('drop');
					  
					  $('.after-the-race .question.two').delay(1300).toggle('drop');
				  }
			  }
		  }
	});
	
	/* Winners Circle Styles */
	$('.question-winners-circle img').draggable({
		revert: true
	});
	
    $( '.answer-winners-circle' ).droppable({
      drop: function( event, ui ) {
		  $('.feedback').fadeOut(0);

		  if($(ui.draggable).data('rel') == $(this).attr("id")) {
			  winnersCirlce++;
			  $(this).find('.circle').animate({
				  backgroundColor: "#155f9c",
				  borderColor: "#fff"
			  }, 500);
			  if(winnersCirlce < 5) {
				  $(ui.draggable).parent().fadeOut(0);
				  $(ui.draggable).parent().next().toggle('drop');
			  }
			  var s = '#' + $(ui.draggable).data('rel') + '.feedback';
			  $(s).toggle( 'drop' );
		  }
		  
		  $('.instructions-stud-to-sale-2').toggle('drop', {direction: "bottom"});
		  $('.instructions-stud-to-sale-2').addClass('superhide');
		  
		  if(winnersCirlce >= 5) {
			  $('.instructions-winners-circle-final').toggle('drop', {direction: "bottom"});
		  }
		  
		  return false;
      }
    });
});