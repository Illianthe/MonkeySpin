MS.State.Game = {
    start : function() {
        DE.Util.log('GAME: Starting state');
        MS.Entity.resetId();
        MS.Game.start();
    },
    
    exit : function() {
        DE.Util.log('GAME: Exiting state');
        MS.Game.exit();
    },
    
    draw : function() {
        MS.Game.draw();
    },
    
    update : function() {
        MS.Game.update();
    }
};