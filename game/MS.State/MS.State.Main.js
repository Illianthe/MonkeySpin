MS.State.Main = {
    start : function() {
        DE.Util.log('MAIN : Starting state');
    },
    
    exit : function() {
        DE.Util.log('MAIN : Exiting state');
    },
    
    draw : function() {
    },
    
    update : function() {
        if (typeof(this.update.subscribed) == 'undefined') {
            this.update.subscribed = true;
            
            var next = function(event, type) {
                DE.InputManager.unsubscribeAll(next);
                DE.StateManager.pop();
                DE.StateManager.push(MS.State.Game);
            }
            DE.InputManager.subscribeAll(next);
        }
    }
};