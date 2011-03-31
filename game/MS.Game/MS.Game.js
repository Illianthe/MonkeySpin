MS.Game = {
    start : function() {
        MS.Game.Input.start();
        MS.Game.Player.start();
        MS.Game.Map.start();
        MS.Game.Score.start();
        
        MS.Audio.play(MS.Audio.Track.GAMEBG);
    },
    
    exit : function() {
        MS.Game.Input.exit();
        
        MS.Audio.stop(MS.Audio.Track.GAMEBG);
    },
    
    update : function() {
        MS.Game.Player.update();
        MS.Game.Map.update();
        MS.Renderer.update();
    },
    
    draw : function() {
        MS.Game.Map.draw();
        MS.Game.Player.draw();
        MS.Renderer.drawBackground();
    },
    
    restart : function() {
        MS.Game.Player.start();
        MS.Game.Map.start();
    }
}