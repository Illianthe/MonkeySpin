MS.State.Main = {
    start : function() {
        DE.Util.log('MAIN : Starting state');
        DE.Renderer.Object.create('title');
        DE.InputManager.changeContext(this);
    },
    
    exit : function() {
        DE.Util.log('MAIN : Exiting state');
        DE.Renderer.Object.destroy('title');
    },
    
    draw : function() {
        $('#title').html('Monkey Spin');
    },
    
    update : function() {
        if (typeof(this.update.subscribed) == 'undefined') {
            this.update.subscribed = true;
            DE.InputManager.subscribeAll(this.next);
        }
    },
    
    /**
     * void next(obj event, string type)
     * Processes input to proceed to the next state
     */
    next : function(event, type) {
        DE.InputManager.unsubscribeAll(this.next);
        DE.StateManager.pop();
        DE.StateManager.push(MS.State.Game);
    }
};