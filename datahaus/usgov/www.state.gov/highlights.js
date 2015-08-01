var myHighlightsXML='/highlights_xml/'+item_type+'_'+item_id+'.xml';
var myLearnmoreXML='/learnmore_xml/'+item_type+'_'+item_id+'.xml';
var atLeastOneHighlight=false;

$(document).ready(function()
{
  $.ajax({
    type: "GET",
    url: myHighlightsXML,
    dataType: "xml",
    success: parsePageXml
  });
});

$(document).ready(function()
{
  $.ajax({
    type: "GET",
    url: myLearnmoreXML,
    dataType: "xml",
    success: parsePageXml
  });
});

function parsePageXml(xml)
{
  var className = $(xml).find("className").text();
  var domainId=0;
  var isChanged=false;
  
  // do once
  $(className).css('display', 'block');  //make the header visible

  		
  // do for each highlight
  $(xml).find("highlight").each(function()
  {
  	if ($(this).find("domainId").text() == '1') {
  		if (className.indexOf('highlights') != -1) {
  			$("#home-page-highlights").css('display', 'block');
  		}
  	}
  	if ($(this).find("domainId").text() == '20') {
		//usun custom styles
	    	$("#body-row02-col03").css('display','block');
	    	$("#body-row02-col01andcol02").css('width','695px'); // when there is no left nav
	    	$("#body-row02-col02").css('width','535px'); // when there IS a left nav
	    	$("#body-row02-col02").css('background','none'); 
		//usun styles for the accordian - they are named differently than what's in "className" var,
		// so we have to make sure we turn on the right one.
		if (className.indexOf('highlights') != -1) {
  			$("#highlights").css('display', 'block');
  			$("#highlights-body").css('display', 'block');
			// always show the highlights accordian pre-opened if there are highlights
			$("#highlights").removeClass("closed").addClass("open");
			atLeastOneHighlight=true;
		}
		else {
  			$("#learn-more").css('display', 'block');
			if (!atLeastOneHighlight) {
				// show the learnmore accordian pre-opened since there were no highlights at all
  				$("#learnmore-body").css('display', 'block');
				$("#learn-more").removeClass("closed").addClass("open");
			}
		}
	}
	if ($(this).find("domainId").text() == '11') {
          //pepfar custom styles
          $("#highlights-tier3-short").css('display','block');
          $("#highlights-tier3-long").css('display','block');
    }
	if ($(this).find("domainId").text() == '15') {
		//diplomacy.state.gov custom styles - for the NEW design 2012
		// we need to check the actual highlight content to determine if it's a quote, photo, or graybar.
		// so set a var here and use down below
        domainId=15;
        if (className.indexOf('highlights') != -1) {
			atLeastOneHighlight=true;
			$("#content.subpage .wrap .right").css('display', 'block');
			// make thinner so we have a right column for highlights
  			$("#content.subpage .wrap .left").css('width', '570px');
  			$("#content.subpage .wrap .top h2").css('width', '570px');
  			$("#breadcrumbs").css('width', '570px');
		}
   	}
  	if ($(this).find("domainId").text() == '23') {
		//ecoparterships custom styles
	    	//$("#right_content_well_container").css('width','570px');  // down from 770 default
	    	//$("#right_content_well_container").css('float','left');
	    	//$("#highlights-container").css('display','block'); 
	}
  	if ($(this).find("domainId").text() == '24') {
		//ghi custom styles
	    	$("#left-content").css('width','700px');  // down from 930 default
	    	$("#sidebar-right").css('display','block');
	    	$("#highlights").css('display','block');
	}
  	if ($(this).find("domainId").text() == '25') {
		//apec custom styles
	}
  	if ($(this).find("domainId").text() == '26') {
		//strategictrade (exbs) custom style to reduce content width when highlight or learnmore is present
	    	$("#content-well").css('width','696px');
	}
  	if ($(this).find("domainId").text() == '27') {
		//crc custom styles
	    	$("#highlights").css('display','block');
	}
  	if ($(this).find("domainId").text() == '3') {
		//fpc custom styles
		if (className.indexOf('highlights') != -1) {
	    		$("#highlights-headline-fpc").css('display','block');
		}
		else {
	    		$("#learnmore-headline-fpc").css('display','block');
		}
	    	$("#body-row02-col01andcol02").css('width','670px');
	    	$("#body-row02-col02").css('width','530px');
	}
  	if ($(this).find("domainId").text() == '2') {
		//oig custom style for content width when left nav present
	    	$("#body-row02-col02andcol03").css('width','530px'); // down from 770
	    	$("#body-row02-col01andcol02andcol03").css('width','670px');  // down from 910
		//oig styles for the accordian - they are named differently than what's in "className" var,
		// so we have to make sure we turn on the right one.
		if (className.indexOf('highlights') != -1) {
  			$("#highlights").css('display', 'block');
  			$("#highlights-body").css('display', 'block');
			// always show the highlights accordian pre-opened if there are highlights
			$("#highlights").removeClass("closed").addClass("open");
			atLeastOneHighlight=true;
		}
		else {
  			$("#learn-more").css('display', 'block');
			if (!atLeastOneHighlight) {
				// show the learnmore accordian pre-opened since there were no highlights at all
  				$("#learnmore-body").css('display', 'block');
				$("#learn-more").removeClass("closed").addClass("open");
			}
		}
	}
	var highlightId = $(this).find("highlight_id").text();
	var highlightDiv = $(this).find("highlight_container").text();
	
    	//$(highlightDiv).append("<strong>" + $(this).find("name").text() + "</strong><br />");

  	$.ajax({
	    type: "GET",
	    url: $(this).find("highlightPath").text(),
	    dataType: "xml",
	    success: function(highlightXml) {
  			var name = $(highlightXml).find("name").text();
			//alert(name);
						
			// **IMPORTANT - these highlights are NOT guaranteed to be processed in the same order they are assigned as!
			//  could be 1,2,4,3  etc..
	  		var highlightHtml = $(highlightXml).find("highlightHtml").text();
	  		//alert(highlightHtml);
	  		if (domainId != '15') {
	  			// show the highlight header (title) for all domains except diplomacy.state.gov
    			$(highlightDiv).html("<strong class='highlight-header'>" + name + "</strong>");
			}
			$(highlightDiv).append(highlightHtml + "<hr>");
    		$(highlightDiv).css('display','block');
    		
    		// make the stay connected highlight display correctly
  			$("#sidebar .stay-connected").parent().css('margin', '0 0 15px 0');
  			$("#sidebar .stay-connected.top").parent().find("hr").css('display', 'none');
  			$("#sidebar .stay-connected").parent().find("hr").css('width','246px');
  			$("#sidebar .stay-connected").css('width', '260px');
  			$("#sidebar .stay-connected").css('padding', '10px 0px 10px 7px');
  			
    		
    		// look at the highlight content itself and add extra styling based on what it is - FOR DIPLOMACY site
    		if (domainId == '15') {
    			// diplomacy - specific content in the highlight (quote, photo, or graybar) will change the right column style.
    			// only use first highlight on this page as the reference.  If mix of photo & quotes, etc, then no guarantee it will look correct
				var itemNum = $(this).find("itemNum").text();
    			if (!isChanged && highlightHtml.indexOf('class="photo"') != -1) {
    				$("#highlights").addClass("aside").addClass("photo");
    				isChanged=true;
    			}
       			else if (!isChanged && highlightHtml.indexOf('class="quote"') != -1) {
    				$("#highlights").addClass("aside").addClass("quote");
    				isChanged=true;
    			}
    			else if (!isChanged && highlightHtml.indexOf('class="graybar"') != -1) {
    				$("#highlights").addClass("aside").addClass("quote");
    				$("#content .wrap .top").addClass("bar");
    				$("#content .wrap .right").addClass("bar");
    				isChanged=true;
    			}
    			else {
    				// default when I don't know what it is for diplomacy, this seems to work well
   					if (!isChanged) {
   						$("#highlights").addClass("aside").addClass("quote");
    				}
    				// display the title header (if there is one) and if we don't know what type of highlight it is
    				if (name.length>0) {
   						$(highlightDiv).prepend("<h3><span>" + name + "</span></h3>");
   					}
    			}
    		}
	    }	
	  });
  });
}
