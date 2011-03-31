MS.Menu = {
	
	// TODO: Move these inside a config file rather than hard code?
	  
	/** Initialize human readable menu items **/
	menuItems : new Array("PLAY", "SCORES", "HELP", "OPTIONS"),
	
	/** Cursor positions in pixles relative to "#menu" DIV box **/
	itemsCursorX : new Array(10,3,78,55),
	itemsCursorY : new Array(6,36,88,110),
	
	/** Menu index at which the Cursor is positioned **/
	cursorPositionIndex: 0,
	
	/** Keep track of key event listener **/
	keyEventListener_enabled: false,
	
	/** Displayes the menu on the screen by setting the style of the #MenuScreen DIV tag to display: inline,
	 * alsos rest position of the curser to the first menu item,
	 * turns off any menu highlights by removing the background image from the "#menu" DIV box
	 * subscribes to keyboard events by adding the menuKeyEventListener
	 *  
	 */
	showMenu : function (){
		MS.Menu.cursorPositionIndex = 0;	
		$("#menuScreen").css("display", "inline");
		$("#menuCursor").css("top", MS.Menu.itemsCursorY[MS.Menu.cursorPositionIndex]);
		$("#menuCursor").css("left", MS.Menu.itemsCursorX[MS.Menu.cursorPositionIndex]);
		$("#menu").css("background", "");
		
		MS.Audio.play(MS.Audio.Track.MENUBG);
		
		if (!MS.Menu.keyEventListener_enabled) {
			DE.InputManager.Keyboard.subscribe(MS.Menu.menuKeyEventListener);
			MS.Menu.keyEventListener_enabled = true;
		}

	},


	/** Hides the menu on the screen by setting the style of the #MenuScreen DIV tag to display: none,
	 * alsos un-subscribes the menuKeyEventListener from keyboard events.
	 *   
	 */	
	hideMenu: function(){		
		$("#menuScreen").css("display", "none");
		
		MS.Audio.stop(MS.Audio.Track.MENUBG);
		
		if (MS.Menu.keyEventListener_enabled) {
			DE.InputManager.Keyboard.unsubscribe(MS.Menu.menuKeyEventListener);
			MS.Menu.keyEventListener_enabled = false;
		}
	},


	/** Moves the cursor position up by 1 menu item. If already at top of menu, does nothing. 
	 *  Internally triggered through the menuKeyEventListener.
	 *   
	 */		
	moveUp: function (){
		var oldIndex =  MS.Menu.cursorPositionIndex;
		MS.Menu.cursorPositionIndex = Math.max(0, MS.Menu.cursorPositionIndex - 1);
		if (oldIndex != MS.Menu.cursorPositionIndex) MS.Menu.moveCursor(MS.Menu.cursorPositionIndex);
	},


	/** Moves the cursor position down by 1 menu item. If already at bottom of menu, does nothing. 
	 *  Internally triggered through the menuKeyEventListener.
	 *   
	 */	
	moveDown: function() {
		var oldIndex =  MS.Menu.cursorPositionIndex;
		MS.Menu.cursorPositionIndex = Math.min(MS.Menu.menuItems.length - 1 , MS.Menu.cursorPositionIndex + 1);
		if (oldIndex != MS.Menu.cursorPositionIndex) MS.Menu.moveCursor(MS.Menu.cursorPositionIndex);
	},



	/** Animates the "#curor" DIV tag to the new menu item index specified.
	 *  Internally triggered through the menuKeyEventListener.
	 *  
	 *  @param newIndex, int which specifies the index of the new menu item to move the curor to.
	 */		
	moveCursor: function(newIndex){
					
		$("#menuCursor").animate({
			top: MS.Menu.itemsCursorY[newIndex],
			left: MS.Menu.itemsCursorX[newIndex]
		}, "fast");
	
	},


	/** Input Listener which subscribes to keyboard events and dispatches appropriate events
	 *  
	 *  @param event, keyDown event called by keyboard listener. 
	 */			
	menuKeyEventListener: function (event){
		if (event.which == '13') {		// Enter
			MS.Menu.menuChoiceSelect(230, 250);
			event.preventDefault();
		} else if (event.which == '38') { // UP
			MS.Menu.moveUp();
			event.preventDefault();
		} else if (event.which == '40') { // DOWN
			MS.Menu.moveDown();		
			event.preventDefault();
		}
	},



	// TODO: HTTP requests for loading dynamic images are used here. Can we swap with pre-loaded resources?
	/** Triggerd by the menuKeyEventListener on the "Enter" key to highlight the menu item which the cursor is on.
	 * This is done by setting the background of the "#menu" div, to a picture of the entire menu with the 
	 * desired menu item highlighted. Timeout's are used to clear the picture to hide the highlight and calls
	 * for the execution of the selected item.
	 *  
	 *  @param clearDelay, integer in milliseconds representing how long after key down before the highlight will stay on for
	 *  
	 *  @param executionDelay, integer in milliseconds representing how long after key down before the appropriate
	 *  action is executed   
	 */	
	menuChoiceSelect: function(clearDelay, executionDelay){
		
		var fileName = "resources/images/menu_" + MS.Menu.menuItems[MS.Menu.cursorPositionIndex].toLowerCase() + ".png";
		$("#menu").css("background", "url('"+fileName+"')");
		setTimeout(
			function(){
				$("#menu").css("background", "");
				setTimeout(MS.Menu.executeSelection, executionDelay);
			},
			 clearDelay
		 );
			 
	},
	
	// TODO: Plug in logic for starting the game
	/** Executes logic for the selected menu item. This is called throught the menuKeyEventListener */
	executeSelection : function() {
		var selectedMenuItem = MS.Menu.menuItems[MS.Menu.cursorPositionIndex];
		switch(selectedMenuItem){
			case "PLAY":
				MS.State.newGame();							
				break;
				
			case "SCORES":
				/** SHOW HIGH SCORES **/
				MS.Future.showScreen( MS.Menu.showMenu );
				break;
				
			case "OPTIONS":
				MS.Future.showScreen( MS.Menu.showMenu );
				break;
				
			case "HELP":
				MS.Video.showVideo(MS.Video.INTRO, function(){
					MS.Menu.showMenu();
				});
				break;
				
			default:
				MS.Future.showScreen( MS.Menu.showMenu );
				break;	
		}		
		MS.Menu.hideMenu();
	}
}
