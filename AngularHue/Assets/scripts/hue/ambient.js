/*
  Ambient Class  
  (c) 2014, Dmitry Sadakov, all rights reserved
*/

'use strict';
/*globals ColorThief, chrome, colorUtil*/
/*exported Ambient*/


var Ambient = (function () {

    var dominantColors  = [],
	    updateHandlers = [],
		publicMethods = {}, 
		lastUpdate = null;

	// fields
	publicMethods.on = false;
	publicMethods.updateImage = false;

	function onImageUpdated(image) {
		if (image === undefined) {
			return;
		}
		if (chrome.runtime.lastError) {
        	console.log(chrome.runtime.lastError.message);
        	chrome.runtime.lastError = null;
        } else {
			var img = new Image();
			img.src = image;

			// get main colors
			var colorThief = new ColorThief();
			var colors = colorThief.getPalette(img, 8);

			lastUpdate = new Date();

			dominantColors = [];

			colors.forEach(function(color){
				dominantColors.push(
					colorUtil().rgbToHex(
					    color[0],
						color[1],
						color[2]
					)
				  );
			});

			updateHandlers.forEach(function(handler) {
				handler(dominantColors, image);
			});
		}

		// do it again
		setTimeout(retryRequestImage, 200);
	}

	function retryRequestImage(){	
		if (publicMethods.on || publicMethods.updateImage) {		
			try {
				requestImage();
			} catch(e) {
				setTimeout(retryRequestImage, 1000);
				console.log(e);
			}
		}
	}

	function requestImage(){
    	if (chrome.runtime.lastError) {
        	console.log(chrome.runtime.lastError.message);
        	return;
        }
		if (typeof(chrome) !== 'undefined' && 
			chrome.tabs !== undefined && 
			chrome.tabs.captureVisibleTab !== undefined) {
			chrome.tabs.captureVisibleTab({quality:30}, onImageUpdated);	
			return true;
		}
		return false;
	}

	publicMethods.run = function() {
		return requestImage();
	};
	publicMethods.onUpdate = function(func){
		updateHandlers = []; // clear for now, memory might go unused on multi-timed open popup
		updateHandlers.push(func);
	};
	publicMethods.getDominantColors = function (colorCount) {
		if ((new Date() - lastUpdate) > 2000) { // more than two seconds delay
			retryRequestImage();
		}
	    return dominantColors;
	};

	return publicMethods;
})();

