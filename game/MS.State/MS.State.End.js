MS.State.End = {
    start : function() {
        DE.Util.log('END: Starting state');
        $('#endScreen').show();
        $('#endScreen .score').text(MS.Game.Score.score);
        
        DE.InputManager.Keyboard.subscribe(this.next);
    },
    
    exit : function() {
        DE.Util.log('END: Exiting state');
        MS.Audio.stop(MS.Audio.Track.GAMEBG);
        $('#endScreen').hide();
    },
    
    draw : function() {},
    update : function() {},
    
    next : function(event, type) {
        switch (event.which) {
            case 13:  // Enter
                MS.State.showMain();
                break;
        }
    }
};