MS.State.Game = {
    start : function() {
        DE.Util.log('GAME: Starting state');
    },
    
    exit : function() {
        DE.Util.log('GAME: Exiting state');
    },
    
    draw : function() {},
    
    update : function() {
        if (typeof(this.update.subscribed) == 'undefined') {
            this.update.subscribed = true;
            DE.InputManager.subscribeAll(MS.Game.Input.parse);
        }
    }
};