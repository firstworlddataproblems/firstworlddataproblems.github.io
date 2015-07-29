// miniCarousel
// State of California
// Version 2010.09.28

var miniCarousel = {
	widthOfEachImg:181, // width of each image, including padding
	totalNumberOfImgs:15,
	numberOfVisibleImgs:3, // number of images to show at a time
	speed:181, // speed, number of pixels to move each cycle

	currentOffset: 0,
	scrollTimerID: null,
	direction: -1, // -1 = right arrow/move left, 1 = left arrow/move right
	counterA: 0,
	section: 1,

	fControl:function (paramDirection, clicked) {
		miniCarousel.functionComplete = false;
		if (!miniCarousel.scrollTimerID) {
			if (((paramDirection == 1) && (miniCarousel.currentOffset < 0)) || ((paramDirection == -1) && (miniCarousel.currentOffset > (-1)*miniCarousel.widthOfEachImg*(miniCarousel.totalNumberOfImgs-miniCarousel.numberOfVisibleImgs)))) {
				miniCarousel.direction = paramDirection;
				miniCarousel.counterA = 0;
				miniCarousel.section -= paramDirection;
				SlideShow.whatsNewCounter.innerHTML = ((miniCarousel.numberOfVisibleImgs * (miniCarousel.section - 1)) + 1) + " - " + ((miniCarousel.numberOfVisibleImgs * (miniCarousel.section - 1)) + miniCarousel.numberOfVisibleImgs) + " of " + miniCarousel.totalNumberOfImgs;
				if (clicked == true) {
					SlideShow.bPlaying = 0;
					clearTimeout (SlideShow.mainTimerID);
					if ((paramDirection == -1) && (miniCarousel.section > 1)) {
					SlideShow.fControl((miniCarousel.numberOfVisibleImgs * (miniCarousel.section - 1)) + 1);
					} else {
						SlideShow.fControl((miniCarousel.section*miniCarousel.numberOfVisibleImgs)-2);
					}
				}
				miniCarousel.fPerformScroll();
			} else if (paramDirection == 1) {
				miniCarousel.direction = -1;
				miniCarousel.counterA = 0;
				miniCarousel.section = (miniCarousel.totalNumberOfImgs / miniCarousel.numberOfVisibleImgs);
				SlideShow.whatsNewCounter.innerHTML = ((miniCarousel.numberOfVisibleImgs * (miniCarousel.section - 1)) + 1) + " - " + ((miniCarousel.numberOfVisibleImgs * (miniCarousel.section - 1)) + miniCarousel.numberOfVisibleImgs) + " of " + miniCarousel.totalNumberOfImgs;
				miniCarousel.currentOffset = ((miniCarousel.direction * miniCarousel.speed) * (miniCarousel.totalNumberOfImgs-(miniCarousel.numberOfVisibleImgs * 2)));
				if (clicked == true) {
					SlideShow.bPlaying = 0;
					clearTimeout (SlideShow.mainTimerID);
					SlideShow.fControl(miniCarousel.totalNumberOfImgs-2);	
				}
				miniCarousel.fPerformScroll();
			} else if (paramDirection == -1) {
				miniCarousel.direction = 1;
				miniCarousel.counterA = 0;
				miniCarousel.section = 1;
				SlideShow.whatsNewCounter.innerHTML = ((miniCarousel.numberOfVisibleImgs * (miniCarousel.section - 1)) + 1) + " - " + ((miniCarousel.numberOfVisibleImgs * (miniCarousel.section - 1)) + miniCarousel.numberOfVisibleImgs) + " of " + miniCarousel.totalNumberOfImgs;
				miniCarousel.currentOffset = -(miniCarousel.direction * miniCarousel.speed) * miniCarousel.numberOfVisibleImgs;
				if (clicked == true) {
					SlideShow.bPlaying = 0;
					clearTimeout (SlideShow.mainTimerID);
					SlideShow.fControl(1);	
				}
				miniCarousel.fPerformScroll();
			}
		}
	},
	
	fPerformScroll:function () { // loops during scroll
		miniCarousel.currentOffset += miniCarousel.direction * miniCarousel.speed;
		miniCarousel.counterA += miniCarousel.speed;
		document.getElementById("slide_show_numbers").style.left = miniCarousel.currentOffset + "px";
		if (miniCarousel.counterA < miniCarousel.widthOfEachImg * miniCarousel.numberOfVisibleImgs) {
			miniCarousel.scrollTimerID = setTimeout(miniCarousel.fPerformScroll,50); // short pause, recurse to continue scroll.
		} else {
			// Finished scroll
			miniCarousel.scrollTimerID = null;
			//if (miniCarousel.currentOffset < 0) {
//				document.getElementById("carousel_left_arrow").style.backgroundPosition = '0px 0px'; // left arrow enabled
//			} else {
//				document.getElementById("carousel_left_arrow").style.backgroundPosition = '-60px 0px'; // left arrow disabled
//			}
//			if (miniCarousel.currentOffset > (-1)*miniCarousel.widthOfEachImg*(miniCarousel.totalNumberOfImgs-miniCarousel.numberOfVisibleImgs)) {
//				document.getElementById("carousel_right_arrow").style.backgroundPosition = '-30px 0px'; // right arrow enabled
//			} else {
//				document.getElementById("carousel_right_arrow").style.backgroundPosition = '-90px 0px'; // right arrow disabled
//			}
		}
	}
}
