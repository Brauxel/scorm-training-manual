$(document).ready(function() {
	var pulsed = false;
	
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
	
	pulsate();
	
});