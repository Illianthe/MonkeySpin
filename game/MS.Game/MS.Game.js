MS.Game = {
    start : function() {
        MS.Game.Input.start();
        MS.Game.Player.start();
        MS.Game.Map.start();
        // $('#music')[0].play();
    },
    
    exit : function() {
        MS.Game.Input.exit();
        $('#music')[0].stop();
    },
    
    update : function() {
        MS.Game.Player.update();
        MS.Game.Map.update();
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