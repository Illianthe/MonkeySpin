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
        DE.InputManager.Touch.init();
        
        // Dynamically change resolution of the viewport
        $('#viewport').css({
            'width' : MS.Config.Resolution.WIDTH,
            'height' : MS.Config.Resolution.HEIGHT
        });
        
        // First state
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
        
        // Draw only when there is an update
        if (loops) {
            DE.StateManager.draw();
        }
    }
};

/**************************************/

// Game assets (images, level info, etc)
MS.Assets = {
    // JavaScript doesn't have a way to import assets automatically, so we
    // have to specify the locations directly
    ImageURLs : {
        background : 'bg.jpg',
        vine : 'vine.jpg',
        ice : 'ice.jpg'
    },
    // Actual image objects that is used by the game logic
    Images : {}
};

/**************************************/

MS.Config = {
    FPS : 30,            // Number of times per second that the game updates
    MAXFRAMESKIP : 5,    // Maximum amount of draw operations that can be skipped
    REFRESHRATE : 60,    // Number of times per second that the game loop runs
    Resolution : {
        WIDTH : 480,
        HEIGHT : 320,
        ASPECTRATIO : 1.5
    }
};

/**************************************/

// States of the game - each state has the following functions common to them:
// - start() : called when state is initialized
// - exit() : called when state is exiting (popped off the stack)
// - draw() : called when the game loop attempts to render graphics
// - update() : called when the game loop attempts to update game state
MS.State = {
    Preload : {
        count : 0,         // Number of physical assets loaded
        totalCount : 0,    // Total number of assets
        percentage : 0,    // Percentage of assets loaded
        test : 0,
        
        start : function() {
            DE.Util.log('PRELOAD: Starting state');
            
            // Loading screen
            DE.Renderer.Object.create('title');
            DE.Renderer.Object.create('loading');
            
            DE.InputManager.changeContext(this);
        },
        
        exit : function() {
            DE.Util.log('PRELOAD: Exiting state');
            
            DE.Renderer.Object.destroy('title');
            DE.Renderer.Object.destroy('loading');
            
            DE.InputManager.unsubscribeAll(this.next);
        },
        
        draw : function() {
            $('#title').html('Monkey Spin');
            $('#loading').html('Loading: ' + this.percentage + '% Completed');
        },
        
        update : function() {
            // If count is not set, we loop through the image object to...well, count
            if (!this.totalCount) {
                for (img in MS.Assets.ImageURLs) {
                    this.totalCount += 1;
                }
                
                // First preload
                MS.Assets.Images = DE.Util.preloadImages(MS.Assets.ImageURLs, this.imageLoaded, this);
            }
            
            if (this.count == this.totalCount && typeof(this.update.subscribed) == 'undefined') {
                this.update.subscribed = true;
                DE.InputManager.subscribeAll(this.next);
            }
        },
        
        // void imageLoaded()
        // Callback function that triggers when images have finished loading
        imageLoaded : function() {
            this.count += 1;
            this.percentage = (this.count / this.totalCount * 100).toFixed(0);
            DE.Util.log('PRELOAD: Percentage of images loaded: ' + this.percentage + '%');
        },
        
        // void next(obj event, string type)
        // Processes input to proceed to the next state
        next : function(event, type) {
            DE.Util.log('PRELOAD: Event (' + type + ') triggered');
            
            // Don't really care about the event - just continue on input
            DE.StateManager.pop();
            DE.StateManager.push(MS.State.Main);
        }
    },
    
    Main : {
        start : function() {
            DE.Util.log('MAIN : Starting state');
            
            DE.InputManager.changeContext(this);
        },
        
        exit : function() {
            DE.Util.log('MAIN : Exiting state');
        },
        
        draw : function() {
            
        },
        
        update : function() {
            
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

DE.InputManager = {
    // Subscribe to all events
    subscribeAll : function(fn) {
        DE.InputManager.Keyboard.subscribe(fn);
        DE.InputManager.Mouse.subscribe(fn);
        DE.InputManager.Touch.subscribe(fn);
    },
    
    // Unsubscribe to all events
    unsubscribeAll : function(fn) {
        DE.InputManager.Keyboard.unsubscribe(fn);
        DE.InputManager.Mouse.unsubscribe(fn);
        DE.InputManager.Touch.unsubscribe(fn);
    },
    
    // Change context
    changeContext : function(context) {
        DE.InputManager.Keyboard.context = context;
        DE.InputManager.Mouse.context = context;
        DE.InputManager.Touch.context = context;
    }
};

DE.InputManager.Base = {
    functions : [],      // Subscribed functions
    context : window,    // Rebinds "this"
    
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
    
    // void trigger(obj event, string type, [obj context])
    // Calls function with "this" set to context and event (keypress, click,
    // etc.) passed as an argument
    trigger : function(event, type, context) {
        var _context = context || this.context;
        this.functions.forEach(function(elt) {
            elt.call(_context, event, type);
        });
    }
};

DE.InputManager.Keyboard = $.extend(true, {}, DE.InputManager.Base);
DE.InputManager.Keyboard.init = function() {
    var that = this;
    $(document).keypress(function(event) {
        that.trigger(event, 'keypress');
    });
};

DE.InputManager.Mouse = $.extend(true, {}, DE.InputManager.Base);
DE.InputManager.Mouse.init = function() {
    var that = this;
    $(document).click(function(event) {
        that.trigger(event, 'click');
    });
};

DE.InputManager.Touch = $.extend(true, {}, DE.InputManager.Base);
DE.InputManager.Touch.init = function() {
    var that = this;
    $(document).bind('tap', function(event) {
        that.trigger(event, 'tap');
    });
}

/**************************************/

DE.Renderer = {};
DE.Renderer.Object = {
    // void create(string id, [string x], [string y], [string width], [string height])
    // Create element on rendering surface
    create : function(id, x, y, width, height) {
        var _x = x || 'auto';
        var _y = y || 'auto';
        var _width = width || 'auto';
        var _height = height || 'auto';
        $html = $('<div id="' + id + '"></div>').css({
            width : _width,
            height : _height,
            left : _x,
            top : _y
        });
        $('#viewport').append($html);
    },
    
    // void destroy(string id)
    // Delete element from rendering surface
    destroy : function(id) {
        $('#' + id, '#viewport').remove();
    },
    
    // void translate(string id, string x, string y)
    // Move object to a new position
    translate : function(id, x, y) {
        $('#' + id).css({
            'left' : x,
            'top' : y
        })
    }
};

/**************************************/

DE.StateManager = {
    states : [],    // State stack
    
    // mixed getCurState()
    // Gets current state from the stack. Returns the state or null if stack
    // is empty.
    getCurState : function() {
        if (this.states.length > 0) {
            return this.states[this.states.length - 1];
        }
        return null;
    },
    
    // void remove()
    // Remove state from the end of the stack
    pop : function() {
        if (this.states.length > 0) {
            var state = this.states.pop();
            if (typeof(state.exit) == 'function') {
                state.exit();
            }
        }
    },
    
    // void add(obj state)
    // Add state to the end of the stack
    push : function(state) {
        this.states.push(state);
        if (typeof(state.start) == 'function') {
            state.start();
        }
    },

    // void draw()
    // Draws the current state
    draw : function() {
        var state = this.getCurState();
        if (state && typeof(state.draw) == 'function'){
            state.draw();
        }
    },
    
    // void update()
    // Updates the current state
    update : function() {
        var state = this.getCurState();
        if (state && typeof(state.update) == 'function') {
            state.update();
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
    
    // object preloadImages(object images, function callback, [obj context])
    // Loads images into the browser cache to prevent flickering and other
    // rendering "bugs" during execution. Returns when everything has
    // finished loading. The callback function executes once for every image
    // after it has fully loaded (i.e. is in cache).
    preloadImages : function(images, callback, context) {
        var result = {};
        var scope = context || window;
        for (elt in images) {
            result[elt] = new Image();
            result[elt].src = images[elt];
            $(result[elt]).load(function() {
                if (typeof callback == 'function') {
                    callback.call(scope);
                }
            });
        }
        return result;
    }
};