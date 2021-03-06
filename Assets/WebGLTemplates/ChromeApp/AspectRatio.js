(function() {
	var currentWindow = chrome.app.window.current();
	var gameContainer = document.getElementById("gameContainer");
	var canvas;
	var tries = 0;
	var canvasCheck = setInterval(function(){
		canvas = document.querySelector("canvas");
		tries ++;
		if(canvas || tries > 20) {
			clearInterval(canvasCheck);
		}
	},500)

	var originalWidth = %UNITY_WIDTH%;
	var originalHeight = %UNITY_HEIGHT%;
	
	function ResizeContainer(){
		if(currentWindow.isFullscreen()){
			var screenWidth = currentWindow.outerBounds.width;
			var screenHeight = currentWindow.outerBounds.height;
		}else{
			var screenWidth = currentWindow.innerBounds.width;
			var screenHeight = currentWindow.innerBounds.height;
		}
		if(%UNITY_CHROME_LOCK_ASPECT_RATIO%){			
			var ratio = Math.max(originalWidth/screenWidth,originalHeight/screenHeight);
			var width = originalWidth/ratio;
			var height = originalHeight/ratio;
			var x = screenWidth/2 - width/2;
			var y = screenHeight/2 - height/2;
			
			gameContainer.style.left = x + 'px';
			gameContainer.style.top = y + 'px';
			gameContainer.width = width;
			gameContainer.height = height;		  
			if(canvas) {
				canvas.style.left = x + 'px';
				canvas.style.top = y + 'px';
				canvas.width = width;
				canvas.height = height;
			}
		}else{
			gameContainer.width = screenWidth;
			gameContainer.height = screenHeight;		  
			if(canvas) {
				canvas.width = screenWidth;
				canvas.height = screenHeight;		  
			}
		}
	}
	
	currentWindow.onBoundsChanged.addListener(ResizeContainer);
	currentWindow.onFullscreened.addListener(ResizeContainer);
	currentWindow.onMaximized.addListener(ResizeContainer);
	currentWindow.onRestored.addListener(ResizeContainer);
 	
	ResizeContainer();
	
})();