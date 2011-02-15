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
