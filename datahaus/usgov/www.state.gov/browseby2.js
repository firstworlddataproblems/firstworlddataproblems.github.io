function BrowseBy() {
	BrowseByMenu('myTopic','/menu/topic/A2_2010.htm','topic_a');
	//myCountry is only used by older browse by versions
	BrowseByMenu('myCountry','/menu/country/AB2_2010.htm','country_ab');
	//new browse by now includes US so it's named locations
	BrowseByMenu('myLocation','/menu/country/AB2_2010.htm','country_ab');
	BrowseByMenu('myPubType','/menu/pubtype/AZ2_2010.htm','');
	BrowseByMenu('mySpeaker','/menu/speaker/AB2_2010.htm','speaker_ab');
}

function BrowseByMenu(targetDiv, url, hiliteId){
	// well, ok, not necessarily a div, but anything with an id
	if(hiliteId != '') {
		hilite = '#'+hiliteId;
		// get the id name of the last hilited item (it's stored in a hidden html div)
		if (url.indexOf('speaker') != -1) {
			lastHilite = $('#lastSpeaker').html();
			$(lastHilite).removeClass("selected");
			// store the new hilited name in lastHilite html
			$('#lastSpeaker').html(hilite);
		}
		/*
		if (url.indexOf('country') != -1) {
			lastHilite = $('#lastCountry').html();
			$(lastHilite).removeClass("selected");
			$('#lastCountry').html(hilite);
		}
		*/
		if (url.indexOf('topic') != -1) {
			lastHilite = $('#lastTopic').html();
			$(lastHilite).removeClass("selected");
			$('#lastTopic').html(hilite);
		}
		if (url.indexOf('country') != -1) {
			//make sure the new location id exists, if not fall back to the old country div name (to keep all pages, old and new working during a rebuild or for other domains using this)
			if($('#lastLocation').length>0) {
				lastHilite = $('#lastLocation').html();
				$(lastHilite).removeClass("selected");
				$('#lastLocation').html(hilite);
			} else {
				lastHilite = $('#lastCountry').html();
				$(lastHilite).removeClass("selected");
				$('#lastCountry').html(hilite);
			}
			
			
		}
		$(hilite).addClass("selected");
	}
	target = '#'+targetDiv;
	$(target).load(url);
	//$(target).load('/proxy.cfm?path='+url);
}

function Jump2Search(word) {
  word=word.replace(/\s/g,"%2520");
  word=word.replace(/%20/g,"%2520");
  word=word.replace(/%2D/g,"%252D");  // hyphen like al-qaida
  word=word.replace(/%27/g,"%2527");  //make sure Women's Issues will work
  url = "http://search.state.gov/search?"+word+"&filter=0&start_date=&end_date=&getfields=*&site=state_en_stategov&output=xml_no_dtd&client=state_en_stategov&proxystylesheet=state_en_stategov";

  window.location = url;
}

function Jump2Url(url) {
  window.location = url;
}

function BrowseByDate(daysBack) {
  var today = new Date(); 
  var d = new Date(); 
  switch(daysBack)
  {
  case 2:
    d.setDate(today.getDate()-2); 
    break;
  case 7:
    d.setDate(today.getDate()-7); 
    break;
  case 90:
    d.setDate(today.getDate()-90); 
    break;
  }
  var month1=d.getMonth() + 1;
  var month2=today.getMonth() + 1;
  var day1=d.getDate();
  var day2=today.getDate();

  if (month1 < 10) { month1 = "0"+month1; }
  if (month2 < 10) { month2 = "0"+month2; }
  if (day1 < 10) { day1 = "0"+day1; }
  if (day2 < 10) { day2 = "0"+day2; }

  var dateRange = d.getFullYear() + "-" + month1 + "-" + day1 + ".." + today.getFullYear() + "-" + month2 + "-" + day2;
  
  	//added to fix date issue for facets phase 2
	var start_date = d.getFullYear() + "-" + month1 + "-" + day1;
  	var end_date = today.getFullYear() + "-" + month2 + "-" + day2;

	var monthNames = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug","Sep","Oct","Nov","Dec");
	var monthName1 = monthNames[d.getMonth()];
	var monthName2 = monthNames[today.getMonth()];

  	var H = monthName1 + "+" + day1 + "%2C+" + d.getFullYear();
  	var L = monthName2 + "+" + day2 + "%2C+" + today.getFullYear();
  
  url='http://search.state.gov/search?q=inmeta:DC_date:daterange:'+dateRange+'&dnavs=inmeta:DC_date:daterange:'+dateRange+'&H='+H+'&L='+L+'&D=&Search.x=0&Search.y=0&author=&start_date='+start_date+'&end_date='+end_date+'&as_occt=&as_filetype=&as_epq=&as_oq=&as_eq=&getfields=*&site=state_en_stategov&entqr=3&getfields=*&entsp=0&output=xml_no_dtd&lr=lang_en&client=state_en_stategov&ud=1&search-button=Search&oe=UTF-8&ie=UTF-8&proxystylesheet=state_en_stategov&ignore&search-button.x=0&search-button.y=0&filter=0';
  Jump2Url(url);
}

$(document).ready(function(){

//new browse by - after global changes. We are keeping this in place because other domains may still be using the drop down (like those using old Banner creator templates)
	$("#browse-by-dropdown").change(function () {
		$("#browse-by-dropdown option:selected").each(function () {
			if($(this).text() == 'Topic') {
				$('#browse-by-topic').show();
	    			$('#browse-by-speaker,#browse-by-publication,#browse-by-country,#browse-by-date,#browse-by-location').hide();
			}
			else if($(this).text() == 'Speaker') {
				$('#browse-by-speaker').show();
	    			$('#browse-by-topic,#browse-by-publication,#browse-by-country,#browse-by-date,#browse-by-location').hide();
			}
			else if($(this).text() == 'Publication') {
				$('#browse-by-publication').show();
	    			$('#browse-by-speaker,#browse-by-topic,#browse-by-country,#browse-by-date,#browse-by-location').hide();
			}
			else if($(this).text() == 'Country') {
				$('#browse-by-country').show();
	    			$('#browse-by-speaker,#browse-by-publication,#browse-by-topic,#browse-by-date,#browse-by-location').hide();
			}
			else if($(this).text() == 'Date') {
				$('#browse-by-date').show();
	    			$('#browse-by-speaker,#browse-by-publication,#browse-by-country,#browse-by-topic,#browse-by-location').hide();
			}	
			else if($(this).text() == 'Location') {
				$('#browse-by-location').show();
	    			$('#browse-by-speaker,#browse-by-publication,#browse-by-topic,#browse-by-date,#browse-by-country').hide();
			}		
		});
	});
	
	
	//new browse by for 2013 design
	/* back to the old - browse by popup configurations */
	$("a#topic").click(function() {
	    $('#browse-by-topic').show();
	    $('a#topic').addClass('selected');  
	    $('#browse-by-speaker,#browse-by-publication,#browse-by-country,#browse-by-date,#browse-by-location').hide();
	    $('a#speaker,a#publication,a#country,a#date,a#location').removeClass('selected');
	});
	$("a#speaker").click(function() {
	    $('#browse-by-speaker').show();
	    $('a#speaker').addClass('selected');
	    $('#browse-by-topic,#browse-by-publication,#browse-by-country,#browse-by-date,#browse-by-location').hide();
	    $('a#topic,a#publication,a#country,a#date,a#location').removeClass('selected');
	});
	$("a#publication").click(function() {
	    $('#browse-by-publication').show();
	    $('a#publication').addClass('selected');
	    $('#browse-by-topic,#browse-by-speaker,#browse-by-country,#browse-by-date,#browse-by-location').hide();
	    $('a#topic,a#speaker,a#country,a#date,a#location').removeClass('selected');
	});
	$("a#country").click(function() {
	    $('#browse-by-country').show();
	    $('a#country').addClass('selected');
	    $('#browse-by-topic,#browse-by-speaker,#browse-by-publication,#browse-by-date,#browse-by-location').hide();
	    $('a#topic,a#speaker,a#publication,a#date,a#location').removeClass('selected');
	});
	$("a#date").click(function() {
	    $('#browse-by-date').show();
	    $('a#date').addClass('selected');
	    $('#browse-by-topic,#browse-by-speaker,#browse-by-publication,#browse-by-country,#browse-by-location').hide();
	    $('a#topic,a#speaker,a#publication,a#country,a#location').removeClass('selected');
	});
	$("a#location").click(function() {
	    $('#browse-by-location').show();
	    $('a#location').addClass('selected');
	    $('#browse-by-topic,#browse-by-speaker,#browse-by-publication,#browse-by-date,#browse-by-country').hide();
	    $('a#topic,a#speaker,a#publication,a#date,a#country').removeClass('selected');
	});
	$("a.close-popup").click(function() {
	    $(this).parents('.popup').hide();
	    $('a#topic,a#speaker,a#publication,a#country,a#date,a#location').removeClass('selected');   
	});
	$("a.close-callout").click(function() {
	    $("#graphic-callout").hide();
	});
	$('a#topic,a#speaker,a#publication,a#country,a#date')
    .bind('mouseenter mouseleave', function(event) {
        $(this).toggleClass('hover');
    });
	
	$("a.close-popup").click(function() {
	    $(this).parents('.popup').hide();
	    $('a#topic,a#speaker,a#publication,a#country,a#date,a#location').removeClass('selected');   
	});
	$("a.close-callout").click(function() {
	    $("#graphic-callout").hide();
	});
	$('a#topic,a#speaker,a#publication,a#country,a#date,a#location')
    .bind('mouseenter mouseleave', function(event) {
        $(this).toggleClass('hover');
    });
	
	/* load the initial browse-by menus - this function is in browseby.js */
	BrowseBy();
});//eo on ready