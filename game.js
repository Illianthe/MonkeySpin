$(document).ready(function() {
    MS.init();
});

// Object.create() was introduced in JavaScript 1.8.5, meaning it isn't
// implemented in all modern browsers yet. This is a workaround
// until that time comes...
if (typeof Object.create != 'function') {
    Object.create = function(o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

/******************************************************************************/

// Object that contains the game logic for Monkey Spin
var MS = {
    counter : 0,
    images : {
	background : "bg.jpg",
	vine : "vine.jpg"
    },
    init : function() {
        that = this;
        DE.Util.preload(this.images, function() {
            that.counter += 1;
            DE.Util.log(that.counter);
        });
        DE.Util.log(DE.InputManager.Keyboard.i);
    }
};

/******************************************************************************/

// Object that contains the engine and its subsystems
var DE = {};

// Config options for the engine
DE.Config = {
    DEBUG : true
};

// Manages the user input (e.g. keyboard, mouse, touch interface)
DE.InputManager = {};
DE.InputManager.Base = {
    i : 45435
};
DE.InputManager.Keyboard = Object.create(DE.InputManager.Base);
DE.InputManager.Mouse = Object.create(DE.InputManager.Base);

// Render visuals to user
DE.Renderer = {};

// Game state manager (essentially a stack)
DE.StateManager = {};

// General utility functions
DE.Util = {
    // void log(string message)
    // Logs a message and displays it in an appropriate manner
    // (e.g. browser console if it exists).
    log : function(msg) {
        if (typeof(console) != 'undefined' && DE.Config.DEBUG) {
            console.log(msg);
        }
    },
    
    // object preload(object images, function callback)
    // Loads images into the browser cache to prevent flickering and other
    // rendering "bugs" during execution. Returns when everything has
    // finished loading. The callback function executes once for every image
    // after it has fully loaded (i.e. is in cache).
    preload : function(images, callback) {
        result = {};
        for (elt in images) {
            result[elt] = new Image();
            result[elt].src = images[elt];
            $(result[elt]).load(function() {
                if (typeof callback == 'function') {
                    callback();
                }
            });
        }
        return result;
    }
};