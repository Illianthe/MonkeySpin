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
    
    isKeypress : function(type) {
        if (type == 'keypress') {
            return true;
        }
        return false;
    },
    
    isTap : function(type) {
        if (type == 'tap') {
            return true;
        }
        return false;
    },
    
    isClick : function(type) {
        if (type == 'click') {
            return true;
        }
        return false;
    }
};

DE.InputManager.Base = {
    functions : [],      // Subscribed functions
    
    /**
     * void subscribe(function fn)
     * Adds a function to the array that will listen to triggered events
     */
    subscribe : function(fn) {
        this.functions.push(fn);
    },
    
    /**
     * void unsubscribe(function fn)
     * Stop function from listening to triggered events
     */
    unsubscribe : function(fn) {
        this.functions = this.functions.filter(function(elt) {
            return (elt != fn);
        });
    },
    
    /**
     * void trigger(obj event, string type, [obj context])
     * Calls function with "this" set to context and event (keypress, click,
     * etc.) passed as an argument
     */
    trigger : function(event, type, context) {
        var _context = context || window;
        this.functions.forEach(function(elt) {
            elt.call(_context, event, type);
        });
    }
};

DE.InputManager.Keyboard = $.extend(true, {}, DE.InputManager.Base);
DE.InputManager.Keyboard.init = function() {
    var that = this;
    $(document).keyup(function(event) {
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
    $(document).bind('touchmove', function(event) {
        event.preventDefault();
    });
    $(document).bind('tap', function(event) {
        that.trigger(event, 'tap');
    });
}
