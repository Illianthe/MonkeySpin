/**
 * Raw input is passed in from the
 * controller; it must be parsed to determine the correct action to take.
 * This may vary depending on game data.
 */
MS.Game.Input.js = {
    parse : function(event, type) {
        if (DE.InputManager.isTap(type)) {
            parseTap(event);
        }
        else if (DE.InputManager.isClick(type)) {
            parseClick(event);
        }
        else if (DE.InputManager.isKeypress(type)) {
            parseKeypress(event);
        }
    },
    
    parseKeypress : function(event) {
        switch (event.keyCode) {
            case 37:    // Left Arrow
            case 65:    // A
            case 39:    // Right Arrow
            case 68:    // D
                MS.Game.Actions.spin();
                break;
            case 38:    // Up Arrow
            case 87:    // W
                MS.Game.Actions.climb();
                break;
            case 32:    // Space
                MS.Game.Actions.jump();
                break;
        }
    },
    
    parseClick : function(event) {
        
    },
    
    parseTap : function(event) {
        
    }
}