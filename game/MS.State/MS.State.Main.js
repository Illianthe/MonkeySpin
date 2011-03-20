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
        DE.StateManager.pop();
        DE.StateManager.push(MS.State.Game);
    }
};