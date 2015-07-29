// State of California master template
// Version 2010.11.05

// addLoadEvent by Simon Willison
// Adds a handler to an event without over-riding other handlers
var fromThis;


function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

// get URL parameter
function gup( name ) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null )
		return "";
	else
		return results[1];
}

initNavigation = function() {

	var useNavFolderMatch = true; // Use new folder matching method to highlight the current navigation tab?
	var disableNavFade = false; // Disable navigation fade effects?

	var ignoreNavMouseover = true;
	setTimeout(function(){ignoreNavMouseover = false;},500); // Prevent nav from opening on page load if mouse is already positioned over nav
	var ribbon = document.getElementById("img_ribbon");
	
	ribbon.onmouseout = function () {
		if (!e) var e = window.event;

			// We're not sure if the mouse left the layer or entered a link within the layer.
			// Therefore we're going to check the relatedTarget/toElement of the event, ie. the element the mouse moved to.
			var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;

			//We read out this element, and then we're going to move upwards through the DOM tree
			//until we either encounter the target of the event (ie. the LI), or the body element.
			//If we encounter the target the mouse moves towards a child element of the layer,
			//so the mouse has not actually left the layer. We stop the function.
			if (fromThis)
			if (reltg != ribbon) {
				while (reltg && reltg != fromThis && reltg.nodeName != 'BODY')
							reltg = reltg.parentNode;
				if (reltg != fromThis) {
					fromThis.onmouseout();
				}
			}
		}

	if (document.getElementById) { // Does the browser support the getElementById method?

		var wrkCurrentLocation = location.href;
		var arrCurrentURL=wrkCurrentLocation.split("/");

		var bodyElement = document.getElementsByTagName("BODY");
		if (bodyElement && bodyElement.length == 1) {
			bodyElement[0].className = bodyElement[0].className.replace("javascript_off", "javascript_on"); // Enable the styles that we want to apply only when javascript is enabled

			if (bodyElement[0].className.match("disable_nav_fade")) { // if this class was applied to the body tag, skip fade
				disableNavFade = true;
			}
		}

		navRoot = document.getElementById("nav_list"); // Get main list ul

		var reMainNav = "";
		if (typeof defaultMainList!="undefined")
			reMainNav = new RegExp("^" + defaultMainList + "$", "i"); // Regex for finding the index of the default main list item

		for (var i=0; i<navRoot.childNodes.length; i++) { // Loop over main list items
			var node = navRoot.childNodes[i];
			if (node.nodeName == "LI") {

				////// Highlight the default main nav item //////
				if (reMainNav) {
					if (node.firstChild.innerHTML.match(reMainNav)) { // Found default main nav item
						node.className += " highlighted_nav_item"; // add class to this li
					}
				} else if (useNavFolderMatch && node.childNodes[0] && node.childNodes[0].href) {
					arrNavLink = node.childNodes[0].href.split("/");
					if ((arrNavLink.length > 4) && (arrCurrentURL[3] == arrNavLink[3])) { // folder of current URL matches this nav link
						node.className += " highlighted_nav_item"; // add class to this li
					}
				}

				////// Apply onmouseover and onmouseout event handlers to each main list item //////
				node.onmouseover = function(e) {

					if (!e) var e = window.event;

					var reltg = (e.relatedTarget) ? e.relatedTarget : e.fromElement;
					while (reltg && reltg != this && reltg.nodeName != 'BODY')
						reltg = reltg.parentNode;
					if (reltg == this) return; // mouse was already inside li
					
					navRoot.className = "unhighlight_nav_item";

					var arrayNavPanel = getElementsByClass("nav_panel", this);
					if (!ignoreNavMouseover && (arrayNavPanel.length == 1)) { // does this nav item have a navpanel?
						if (!disableNavFade) {
							if (arrayNavPanel[0].pauseTimerID) // are we pausing after a mouseout?
								clearTimeout (arrayNavPanel[0].pauseTimerID); // cancel it
	
							clearTimeout (arrayNavPanel[0].fadeTimerID); // if this panel is already fading, cancel it
							arrayNavPanel[0].style.zIndex = 2; // put this panel on top
							fadeElem(arrayNavPanel[0],0.25); // fade in
						} else {
							arrayNavPanel[0].style.display = "block";
						}
					}
				}
				node.onmouseout = function(e) {

					if (!e) var e = window.event;

					// We're not sure if the mouse left the layer or entered a link within the layer.
					// Therefore we're going to check the relatedTarget/toElement of the event, ie. the element the mouse moved to.
					var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;

					//We read out this element, and then we're going to move upwards through the DOM tree
					//until we either encounter the target of the event (ie. the LI), or the body element.
					//If we encounter the target the mouse moves towards a child element of the layer,
					//so the mouse has not actually left the layer. We stop the function.
					if (reltg == ribbon) {
						fromThis = this;
						return;
					}
					while (reltg && reltg != this && reltg.nodeName != 'BODY')
						reltg = reltg.parentNode;
						
					if (reltg == this) return; // mouse is still inside li
				
					navRoot.className = "";

					var arrayNavPanel = getElementsByClass("nav_panel", this);
					if (arrayNavPanel.length == 1) {
						if (!disableNavFade) {
							arrayNavPanel[0].style.zIndex = 1;
							var temp = arrayNavPanel[0];
							clearTimeout (arrayNavPanel[0].fadeTimerID);
							arrayNavPanel[0].pauseTimerID = setTimeout(function(){fadeElem(temp,-0.25); temp = null;},160); // short pause, start fade out
						} else {
							arrayNavPanel[0].style.display = "none";
						}
					}
				}
			}
		}
	}
}

fadeElem = function (elemToFade,fadeRate) { // loops during fade
	if (typeof elemToFade.xOpacity=="undefined")
		elemToFade.xOpacity = 0;
	elemToFade.style.display = "block";
	elemToFade.xOpacity += fadeRate;
	fSetOpacity(elemToFade);
	elemToFade.fadeTimerID = null;
	if (elemToFade.xOpacity > 0 && elemToFade.xOpacity < .99) {
		elemToFade.fadeTimerID = setTimeout(function(){fadeElem(elemToFade,fadeRate); elemToFade = null;fadeRate=null},40); // short pause, recurse to continue fade.
	}
	return(0);
}

fSetOpacity = function (obj) {
	if (obj.xOpacity > .99) {
		obj.xOpacity = .99;
	}
	if (obj.xOpacity <= 0) {
		obj.xOpacity = 0;
		obj.style.display = "none";
	}
	obj.style.opacity = obj.xOpacity; // the CSS3 method, for newer Mozilla, Safari, Opera
	obj.style.MozOpacity = obj.xOpacity; // older Mozilla
	obj.style.filter = "alpha(opacity=" + (obj.xOpacity * 100) + ")"; // for IE
}

/* http://www.dustindiaz.com/getelementsbyclass/ */
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

addLoadEvent(initNavigation);


// Switch between the statewide search and local site search forms.
var replaceSearchRadioButtons = {
	init: function() {
		if (document.getElementById("local_form")) {
			document.getElementById("search_local_textfield").setAttribute("autocomplete","off");
			document.getElementById("local_form").action = "/serp.html";
			document.getElementById("local_form").cof.value = "FORID:10";
		}
		if (document.getElementById("ca_form")) {
			document.getElementById("search_ca_textfield").setAttribute("autocomplete","off");
			document.getElementById("ca_form").action = "/serp.html";
			document.getElementById("ca_form").cof.value = "FORID:10";
		}
		if (document.getElementById("head_srch_local") && document.getElementById("head_srch_ca")) {
			document.getElementById("head_srch_local").onclick = replaceSearchRadioButtons.setRadioImages; // add event handlers to the radio buttons
			document.getElementById("head_srch_ca").onclick = replaceSearchRadioButtons.setRadioImages;

			var param_cx = unescape(gup('cx'));
			var titleElement = document.getElementById("serp_title");
			if (param_cx) { // is this a serp?
				if (param_cx == "001779225245372747843:mdsmtl_vi1a") { // statewide search?
					document.getElementById("head_srch_ca").checked = true;
					if (titleElement)
						titleElement.innerHTML = "Statewide Search Results";
				} else {
					if (titleElement)
						titleElement.innerHTML = "Local Search Results";
				}
			}

			replaceSearchRadioButtons.setRadioImages(); // set initial state of background images
		}
	},
	setRadioImages: function() { // set images to match radio buttons
		var posOn = "12px -37px";
		var posOff = "12px 3px";
		document.getElementById("head_srch_l_lbl").style.backgroundPosition = document.getElementById("head_srch_local").checked ? posOn : posOff;
		document.getElementById("head_srch_c_lbl").style.backgroundPosition = document.getElementById("head_srch_ca").checked ? posOn : posOff;
		
		if (document.getElementById("head_srch_local").checked && document.getElementById("ca_form").className == "") {
			document.getElementById("search_local_textfield").value = document.getElementById("search_ca_textfield").value; // copy the text field value
			document.getElementById("ca_form").className = "hidden"; // hide the statewide search form
			document.getElementById("local_form").className = ""; // show the local search form
		}

		if (document.getElementById("head_srch_ca").checked && document.getElementById("local_form").className == "") {
			document.getElementById("search_ca_textfield").value = document.getElementById("search_local_textfield").value;
			document.getElementById("local_form").className = "hidden";
			document.getElementById("ca_form").className = "";
		}
	}
}
addLoadEvent(replaceSearchRadioButtons.init);

//Autra Moore - find height of tallest element in nav_panel
function findHeight(panel) {
	var tallestHeight = 0;
	for (i = 0; i < panel.children.length; i++) {
		if (panel.children.item(i).offsetHeight > tallestHeight) {
			tallestHeight = panel.children.item(i).offsetHeight;
		}
	}
	return tallestHeight;
}
// breadcrumbs
// This function populates the breadcrumb section of the page.

function breadcrumbs()
{
	
	if ((document.getElementById) && document.getElementById('breadcrumb_dynamic')) { // Make sure browser supports getElementById and breadcrumb_dynamic exists
		var arrURL=location.href.split("/"); // Array containing the current URL, split at the slashes

		var output='<a href="/">Home</a>'; // The string which will be output to the browser, starts with a link to the home page

		var path = ''; // Link for the crumbs

		// If last item is blank or index.* or default.*, remove it
		if (arrURL[arrURL.length-1] == '' || arrURL[arrURL.length-1].match(/^index\.|^default\./i) ) {
			arrURL.length--;
		}

		if (arrURL.length > 3) {
			for (counter = 3;counter < arrURL.length-1;counter++) { // Loop to display the links
			
				path += '/' + arrURL[counter];
			
				output += ' <img src="/images/ca_department/bullet_blue.gif" alt="" /> <a href="' + path + '">' + arrURL[counter].replace(/_/g,' ') + '</a>';
			}
			
			// Display the name of the current page in bold
			output += ' <img src="/images/ca_department/bullet_blue.gif" alt="" /> <strong>' + arrURL[arrURL.length-1].replace(/_/g,' ').replace(/\.\w{3,5}$/,'') + '</strong>';
		}

		document.getElementById('breadcrumb_dynamic').innerHTML = output; // Display the breadcrumbs
		
	}
}

addLoadEvent(breadcrumbs); // Add breadcrumbs to the page onload event handler

// End of breadcrumbs javascript