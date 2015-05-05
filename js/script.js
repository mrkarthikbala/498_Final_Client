$(document).ready(function(){
	$(document).foundation();

	var windowheight = $(window).height()-80;
	var windowwidth = $(window).width();
	var halfheight = windowheight/2;
	$('#arrows').css('top', ""+halfheight+'px');
	$('#arrows').css('left', ""+windowwidth/2+'px');
	$(window).resize(function() {
		mainHeight = $(window).height()-90;
		$("#arrows").css('top', ""+ (mainHeight/2)+"px" );		
	});
});
