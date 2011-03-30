/**
 * Raw input is passed in from the
 * controller; it must be parsed to determine the correct action to take.
 * This may vary depending on game data.
 */
MS.Game.Input = {
    start : function() {
        DE.InputManager.Keyboard.subscribe(this.parseKeypress);
    },
    
    exit : function() {
        DE.InputManager.Keyboard.unsubscribe(this.parseKeypress);
    },
    
    parseKeypress : function(event) {
        switch (event.which) {
            case 16:   // Left Shift
                MS.Game.Player.setAction(MS.Game.Player.Actions.SPIN);
                break;
            case 32:    // Space
                MS.Game.Player.setAction(MS.Game.Player.Actions.JUMP);
                break;
        }
    },
    
    parseClick : function(event) {
        
    },
    
    parseTap : function(event) {
        
    }
}