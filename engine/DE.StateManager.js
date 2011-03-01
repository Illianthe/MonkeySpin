DE.StateManager = {
    states : [],    // State stack
    
    /**
     * mixed getCurState()
     * Gets current state from the stack. Returns the state or null if stack
     * is empty.
     */
    getCurState : function() {
        if (this.states.length > 0) {
            return this.states[this.states.length - 1];
        }
        return null;
    },
    
    /**
     * void remove()
     * Remove state from the end of the stack
     */
    pop : function() {
        if (this.states.length > 0) {
            var state = this.states.pop();
            if (typeof(state.exit) == 'function') {
                state.exit();
            }
        }
    },
    
    /**
     * void add(obj state)
     * Add state to the end of the stack
     */
    push : function(state) {
        this.states.push(state);
        if (typeof(state.start) == 'function') {
            state.start();
        }
    },

    /**
     * void draw()
     * Draws the current state
     */
    draw : function() {
        var state = this.getCurState();
        if (state && typeof(state.draw) == 'function'){
            state.draw();
        }
    },
    
    /**
     * void update()
     * Updates the current state
     */
    update : function() {
        var state = this.getCurState();
        if (state && typeof(state.update) == 'function') {
            state.update();
        }
    }
};