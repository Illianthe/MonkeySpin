MS.Game = {
    start : function() {
        MS.Game.Input.start();
        MS.Game.Player.start();
        MS.Game.Map.start();
        MS.Game.Score.start();
        $('#gameMusic1')[0].play();
    },
    
    exit : function() {
        MS.Game.Input.exit();
        $('#gameMusic1')[0].pause();
        $('#gameMusic2')[0].pause();
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