MS.Future = {
	
	
	keyEventListener_enabled: false,	/** Keep track of key event listener **/
	callbackFunction: null, 			/** Keep track of what to do after current video is done **/
	
	/** Displayes the Coming Soon screen by setting the style of the #comingSoon DIV tag to display: inline,
	 * subscribes to keyboard events by adding the menuKeyEventListener
	 *  
	 * @param callback, a callback function to execute when user leaves screen 
	 */
	showScreen : function (callback){
			
		$("#comingSoon").css("display", "inline");
		
		MS.Future.callbackFunction = callback;
		
		if (!MS.Future.keyEventListener_enabled) {
			DE.InputManager.Keyboard.subscribe(MS.Future.futureKeyEventListener);
			MS.Future.keyEventListener_enabled = true;
		}

	},
	
	/** Hides the Coming Soon screen by setting the style of the #comingSoon DIV tag to display: none,
	 * alsos un-subscribes the menuKeyEventListener from keyboard events.
	 *   
	 */	
	hideScreen: function(){
				
		$("#comingSoon").css("display", "none");
		
		if (MS.Future.callbackFunction != null){
			MS.Future.callbackFunction();
			MS.Future.callbackFunction = null;
		}
				
		if (!MS.Future.keyEventListener_enabled) {
			DE.InputManager.Keyboard.unsubscribe(MS.Future.futureKeyEventListener);
			MS.Future.keyEventListener_enabled = false;
		}
	},		
	
	/** Input Listener which subscribes to keyboard events and dispatches appropriate events
	 *  
	 *  @param event, keyDown event called by keyboard listener. 
	 */			
	futureKeyEventListener: function (event){
		if (event.which == '13' || event.which == '32') {		// Enter or Space
			MS.Future.hideScreen();
			event.preventDefault();
		}
	},
		
};