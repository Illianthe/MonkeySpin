MS.State.Game = {
    start : function() {
        DE.Util.log('GAME: Starting state');
        MS.Entity.resetId();
        $('#gameScreen').show();
        MS.Game.start();
    },
    
    exit : function() {
        DE.Util.log('GAME: Exiting state');
        MS.Game.exit();
        $('#gameScreen').hide();
    },
    
    draw : function() {
        MS.Game.draw();
    },
    
    update : function() {
        MS.Game.update();
    }
};