/******************************************************************************/
/* General                                                                    */
/******************************************************************************/

$(document).ready(function() {
    MS.init();
});

// Object.create() was introduced in JavaScript 1.8.5, meaning it isn't
// implemented in all modern browsers yet. This is a workaround
// until that time comes...
if (typeof Object.create != 'function') {
    Object.create = function(obj) {
        function fn() {}
        fn.prototype = obj;
        return new fn();
    };
}

/******************************************************************************/
/* Game                                                                       */
/******************************************************************************/

var MS = {
    init : function() {
        DE.InputManager.Keyboard.init();
        DE.InputManager.Mouse.init();
        
        DE.StateManager.push(MS.State.Preload);
        
        setInterval(MS.run, 1000 / MS.Config.REFRESHRATE);
    },
    
    run : function() {
        var loops = 0;
        var tick = 1000 / MS.Config.FPS;
        var nextTick = (new Date).getTime();
        
        // If there is a slowdown, update tries to catch up
        while ((new Date).getTime() >= nextTick && loops < MS.Config.MAXFRAMESKIP) {
            DE.StateManager.update();
            nextTick += tick;
            loops += 1;
        }
        
        DE.StateManager.draw();
    }
};

MS.Config = {
    FPS : 30,            // Number of times per second that the game updates
    MAXFRAMESKIP : 5,    // Maximum amount of draw operations that can be skipped
    REFRESHRATE : 60     // Number of times per second that the game loop runs
};

// States of the game - each state has an update and draw operation associated
// with it
MS.State = {
    Preload : {
        update : function() {

        },
        
        draw : function() {

        }
    }
};

/******************************************************************************/
/* Engine                                                                     */
/******************************************************************************/

var DE = {};

/**************************************/

DE.Config = {
    DEBUG : true
};

/**************************************/

DE.InputManager = {};

DE.InputManager.Base = {
    functions : [],    // Subscribed functions
    
    // void subscribe(function fn)
    // Adds a function to the array that will listen to triggered events
    subscribe : function(fn) {
        this.functions.push(fn);
    },
    
    // void unsubscribe(function fn)
    // Stop function from listening to triggered events
    unsubscribe : function(fn) {
        this.functions = this.functions.filter(function(elt) {
            return (elt != fn);
        });
    },
    
    // void trigger(obj event, obj context)
    // Calls function with "this" set to context and event (keypress, click,
    // etc.) passed as an argument
    trigger : function(event, context) {
        var scope = context || window;
        this.functions.forEach(function(elt) {
            elt.call(scope, event);
        });
    }
};

DE.InputManager.Keyboard = Object.create(DE.InputManager.Base);
DE.InputManager.Keyboard.init = function() {
    var that = this;
    $(document).keypress(function(event) {
        that.trigger(event);
    });
};

DE.InputManager.Mouse = Object.create(DE.InputManager.Base);
DE.InputManager.Mouse.init = function() {
    var that = this;
    $(document).click(function(event) {
        that.trigger(event);
    })
};

/**************************************/

DE.Renderer = {};

/**************************************/

DE.StateManager = {
    states : [],    // State stack
    
    // void add(obj state)
    // Add state to the end of the stack
    push : function(state) {
        this.states.push(state);
    },
    
    // void remove()
    // Remove state from the end of the stack
    pop : function() {
        if (this.states.length > 0) {
            this.states.pop();
        }
    },
    
    // mixed getCurState()
    // Gets current state from the stack. Returns the state or null if stack
    // is empty.
    getCurState : function() {
        if (this.states.length > 0) {
            return this.states[this.states.length - 1];
        }
        return null;
    },
    
    // void update()
    // Updates the current state
    update : function() {
        var state = this.getCurState();
        if (state && typeof(state.update) == 'function') {
            state.update();
        }
    },
    
    // void draw()
    // Draws the current state
    draw : function() {
        var state = this.getCurState();
        if (state && typeof(state.draw) == 'function'){
            state.draw();
        }
    }
};

/**************************************/

// General utility functions
DE.Util = {
    // void log(mixed message)
    // Logs a message and displays it in an appropriate manner
    // (e.g. browser console if it exists).
    log : function(msg) {
        if (typeof(console) != 'undefined' && DE.Config.DEBUG) {
            console.log(msg);
        }
    },
    
    // object preloadImages(object images, function callback)
    // Loads images into the browser cache to prevent flickering and other
    // rendering "bugs" during execution. Returns when everything has
    // finished loading. The callback function executes once for every image
    // after it has fully loaded (i.e. is in cache).
    preloadImages : function(images, callback) {
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