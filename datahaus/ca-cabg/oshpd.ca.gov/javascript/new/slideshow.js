// Slideshow
// State of California
// 5/19/2010

var SlideShow = {
	delayMS: 6000, // Delay before displaying next image, in milliseconds
	bPlaying: 1, // 1 = playing, 0 = paused

	arrayAnchors: null, // Array of anchors
	arrayContainers: null, //Array of What's new Containers
	arraySlideShowNumbers: null, //Array of What's new Containers
	currentIndex: 0,
	nextIndex: 1, // Index of next image
	mainTimerID: null,
	fadeTimerID: null,
	counterZ: 2, // counter, used for z-index of front image
	carouselHeight: 0,
	whatsNewCounter: null,

	fMainLoop:function () { /* main loop, repeats every x seconds */

		for(counterI = 0; counterI < arrayAnchors.length; counterI++) {
			document.getElementById("slide_show_control_" + (counterI+1)).className = "";
			document.getElementById("whatsNewImage" + (counterI+1)).className = "whatsNewImage";
		}
		document.getElementById("slide_show_control_" + (SlideShow.nextIndex+1)).className = "slide_show_control_highlight";
		document.getElementById("whatsNewImage" + (SlideShow.nextIndex+1)).className = "whatsNewImage_selected";

		arrayAnchors[SlideShow.nextIndex].xOpacity = 0; // Set opacity of next image to 0
		arrayContainers[SlideShow.nextIndex].xOpacity = 0;
		SlideShow.fSetOpacity(arrayAnchors[SlideShow.nextIndex]);
		SlideShow.fSetOpacity(arrayContainers[SlideShow.nextIndex]);
		
		SlideShow.counterZ++;
		arrayAnchors[SlideShow.nextIndex].style.zIndex = SlideShow.counterZ; // Place next <a> on top
		arrayContainers[SlideShow.nextIndex].style.zIndex = SlideShow.counterZ;
			
		//Check for which number was clicked, which section of the carousel is being display and scroll carousel accordingly
		//if (SlideShow.nextIndex <= 4){ //go to section 1
//			if (miniCarousel.section == 2) {
//				miniCarousel.fControl(1);
//			}
//		}
//		if (SlideShow.nextIndex >= 5){ //go to section 2
//			if (miniCarousel.section == 1) {
//				miniCarousel.fControl(-1);
//			}
//		}


		SlideShow.fCrossFade(); // do fade
		
		if (SlideShow.bPlaying)
			SlideShow.mainTimerID = setTimeout(SlideShow.fMainLoop,SlideShow.delayMS); // delay, recurse
	},

	fCrossFade:function () { /* loops during fade */
		SlideShow.fadeTimerID = null;
		arrayAnchors[SlideShow.nextIndex].xOpacity += .20; // fade in
		arrayAnchors[SlideShow.currentIndex].xOpacity -= .20; // fade out
		arrayContainers[SlideShow.nextIndex].xOpacity += .20; // fade in
		arrayContainers[SlideShow.currentIndex].xOpacity -= .20; // fade out
		
		SlideShow.fSetOpacity(arrayAnchors[SlideShow.nextIndex]);
		SlideShow.fSetOpacity(arrayAnchors[SlideShow.currentIndex]);
		SlideShow.fSetOpacity(arrayContainers[SlideShow.nextIndex]);
		SlideShow.fSetOpacity(arrayContainers[SlideShow.currentIndex]);
		
		if (arrayAnchors[SlideShow.nextIndex].xOpacity >= .99) {
			// done with fade

			SlideShow.currentIndex = SlideShow.nextIndex;
	
			SlideShow.nextIndex = (SlideShow.currentIndex < arrayAnchors.length - 1) ? SlideShow.currentIndex + 1 : 0; // index of next img

			for(counterJ = 0; counterJ < arrayAnchors.length; counterJ++) {
				if (SlideShow.currentIndex != counterJ) {
					arrayAnchors[counterJ].xOpacity = 0;
					arrayContainers[counterJ].xOpacity = 0;/* Make sure all other images are transparent. Fix problem where user clicks arrows rapidly. */
					SlideShow.fSetOpacity(arrayAnchors[counterJ]);
					SlideShow.fSetOpacity(arrayContainers[counterJ]);
				}
			}
		} else {
			SlideShow.fadeTimerID = setTimeout(SlideShow.fCrossFade,50); // short pause, recurse to continue fade.
		}

	},

	fSetOpacity:function (obj) {
		if (obj.xOpacity > .99) {
			obj.xOpacity = .99;
		}
		obj.style.opacity = obj.xOpacity; // the CSS3 method, for newer Mozilla, Safari, Opera
		obj.style.MozOpacity = obj.xOpacity; // older Mozilla
		obj.style.filter = "alpha(opacity=" + (obj.xOpacity * 100) + ")"; // for IE
	},

	fControl:function (controlParam) { /* called when a button is clicked */
		if (!SlideShow.fadeTimerID) {
			if (controlParam == "prev"){
				clearTimeout (SlideShow.mainTimerID);
				SlideShow.nextIndex = (SlideShow.currentIndex > 0) ? SlideShow.currentIndex - 1 : arrayAnchors.length - 1; // index of prev img
				SlideShow.bPlaying = 0;
				SlideShow.fMainLoop();
			} else if (controlParam == "next"){
				clearTimeout (SlideShow.mainTimerID);
				SlideShow.bPlaying = 0;
				SlideShow.fMainLoop();
			} else {
				if (SlideShow.currentIndex != controlParam - 1) {
					SlideShow.nextIndex = controlParam - 1;
					clearTimeout (SlideShow.mainTimerID);
					SlideShow.bPlaying = 0;
					SlideShow.fMainLoop();
				}
			}
		}
	},

	initialize:function () {

		if (document.getElementById && document.getElementById("slide_show_container")) { // Make sure browser supports getElementById and div "slide_show_container" exists

			//document.getElementById("slide_show_container").className += " javascript_enabled";
	
			// create array of all anchor nodes
			arrayAnchors = getElementsByClass("whatsNewImage",document.getElementById("whatsNew"),"a");
			//create array of all whatsNewContainers
			arrayContainers = getElementsByClass("whatsNewContainer",document.getElementById("whatsNew"),"div");
			arraySlideShowNumbers = getElementsByClass("slide_show_control",document.getElementById("slide_show_numbers"),"a");
			SlideShow.whatsNewCounter = document.getElementById("whatsNewCounter");
			
			// append a linked number for each image
			for(counterI = 0; counterI < arrayAnchors.length; counterI++) {
				//modified to add id to image a tags in whatsNew & add id to whatsNewContainers
				arrayAnchors[counterI].id = "whatsNewImage" + (counterI + 1);
				arrayContainers[counterI].id = "whatsNewContainer" + (counterI + 1);
				arraySlideShowNumbers[counterI].id = "slide_show_control_" + (counterI + 1);
				arraySlideShowNumbers[counterI].onclick = new Function("SlideShow.fControl(" + (counterI + 1) + ");this.blur();return false;"); // added blur to remove outlines in IE
				
				SlideShow.whatsNewCounter.innerHTML = "1 - " + miniCarousel.numberOfVisibleImgs + " of " + arrayAnchors.length;
				//arraySlideShowNumbers[counterI].onmouseover = new Function("hideAllElements();");
				
				arrayAnchors[counterI].xOpacity = (counterI == 0) ? 1 : 0;
				SlideShow.fSetOpacity(arrayAnchors[counterI]);
				arrayContainers[counterI].xOpacity = (counterI == 0) ? 1 : 0;
				SlideShow.fSetOpacity(arrayContainers[counterI]);
			}

			document.getElementById("slide_show_control_" + (SlideShow.currentIndex+1)).className = "slide_show_control_highlight";
			document.getElementById("whatsNewImage" + (SlideShow.currentIndex+1)).className = "whatsNewImage_selected";
			
			// display first img
			arrayAnchors[SlideShow.currentIndex].style.zIndex = SlideShow.counterZ; // Place first <a> on top
			arrayContainers[SlideShow.currentIndex].style.zIndex = SlideShow.counterZ;

			//SlideShow.mainTimerID = setTimeout(SlideShow.fMainLoop,SlideShow.delayMS);
			
			carouselHeight = document.getElementById("carousel_container").offsetHeight;
			
		}
	}
}

addLoadEvent(SlideShow.initialize);