$(document).ready(function(){
	var isIE6 = /msie|MSIE 6/.test(navigator.userAgent);

	/* remove button onfocus outline */
	$('button').focus(function(){$(this).blur();});
	
	/* form field default value toggle */
	$('.default-value').each(function() {
		var default_value = this.value;
		$(this).css('color', '#000'); /* this could be in the style sheet instead */
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#000');
				this.value = default_value;
			}
		});
	});
	
	
	/* cycle plugin configurations
	$('#top-stories').cycle({
		fx: 'fadeNew',
		timeout: 6000,
		speed: 1000,
		pager: '#top-story-pagination',
		delay: -2000,
		pause: 1
	});	
	$('#feature-slide').cycle({
		fx: 'scrollLeft',
		timeout: 7000,
		speed: 1000,
		//easing:  'easeInBack',   //easeInBounce, easeInBack, easeOutBounce
		prev: '#previous-feature',
		next: '#next-feature',
		delay: -2000,
		pause: 1
	});*/
	
	/* ie 6 form select field overlap fix - see jquery-select-overlap.js */
	if(isIE6) {
	  $(function() {
		$('.overlap-fix').activeXOverlap();
	  });
	}

/* don't display IE6 message for now
	if(isIE6) {
	  $('#ie6msg').show();
	}

	$('#ie6msg').click(function() {
        	$('#ie6msg').hide();
   	});
*/
	// all clicks on map go to map page now
	//if(isIE6) {
	  // for IE6, the overlay has problems, so just forward them to the regular map page
	  $('.where-is-the-secretary-headline').click(function() {
		window.location = "http://www.state.gov/secretary/trvl/map/";
	  });

	  $('#where-is-the-secretary-map').click(function() {
		window.location = "http://www.state.gov/secretary/trvl/map/";
	  });

	//};

	// load the latest dipnotes from twitter
	$("#from-the-dipnote-blog").load("/dipnote.htm"); 

	// load the map popup

	//$('#where-is-the-secretary').click(function() {
	//	$("#google-map-overlay").load("/google-map-overlay.htm"); 
	//	$("#google-map-overlay").show();
   	//});
	//$("#google-map-overlay").load("/google-map-overlay.htm"); 


	// for google maps
        $('#maploading').hide();
        $('#map').css('visibility', 'visible');

});

function CloseCallout() {
	$('#graphic-callout').hide();
}

//structure that holds all data for videos
var video = {};
// called when template loads, this function stores a reference to the player and modules.
function onTemplateLoaded(experienceID) {
        bcExp = brightcove.getExperience(experienceID);
        video[experienceID] = {
                videoPlayer:bcExp.getModule(APIModules.VIDEO_PLAYER),
                exerience:bcExp.getModule(APIModules.EXPERIENCE),
                content:bcExp.getModule(APIModules.CONTENT)
        }
        video[experienceID].videoPlayer.addEventListener(BCVideoEvent.VIDEO_START, onVideoStart);
}

function onVideoStart(config){
        jQuery('#top-stories').cycle('stop');
}

