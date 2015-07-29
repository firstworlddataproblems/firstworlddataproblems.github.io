// State of California master template
// Google Site Search add-on for the 2007 template
// Version 2010.11.16

var serpLocation = "/serp.html"; // Location of your search engine results page (SERP)

// addLoadEvent by Simon Willison
// Adds a handler to an event without over-riding other handlers
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



// Switch between the statewide search and local site search forms.
var replaceSearchRadioButtons = {
	init: function() {

		var headSearchElement = document.getElementById("head_search");
		if (headSearchElement){
			headSearchElement.className = headSearchElement.className.replace("javascript_off", "javascript_on"); // Enable the styles that we want to apply only when javascript is enabled
		}

		if (document.getElementById("local_form")) {
			document.getElementById("search_local_textfield").setAttribute("autocomplete","off");
			document.getElementById("local_form").action = serpLocation;
			document.getElementById("local_form").cof.value = "FORID:10";
		}
		if (document.getElementById("ca_form")) {
			document.getElementById("search_ca_textfield").setAttribute("autocomplete","off");
			document.getElementById("ca_form").action = serpLocation;
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
