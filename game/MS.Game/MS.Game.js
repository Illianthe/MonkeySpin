MS.Game = {
    start : function() {
        MS.Game.Input.start();
        MS.Game.Player.start();
        MS.Game.Map.start();
        $('#music')[0].play();
        
        // Creating temporary start screen...
        MS.Game.Player.character = MS.Entity.create('Monkey', 137, 40, 40, 40);
        for (var i = 0; i < MS.Config.Map.YTILECOUNT; i += 1) {
            var M = MS.Game.Map;
            var a = MS.Entity.createAtTile('Vine', 1, i, 18, 0, 10, 40);
            var b = MS.Entity.createAtTile('Vine', 3, i, 18, 0, 10, 40);
            var c = MS.Entity.createAtTile('Vine', 5, i, 18, 0, 10, 40);
            M.addObject(a, M.staticMap, 1, i);
            M.addObject(b, M.staticMap, 3, i);
            M.addObject(c, M.staticMap, 5, i);
            var rand = DE.Util.rand(1, 3);
            if (rand == 1) {
                a.img = MS.Assets.Images.VINE1;
                b.img = MS.Assets.Images.VINE2;
                c.img = MS.Assets.Images.VINE3;
            }
            else if (rand == 2) {
                a.img = MS.Assets.Images.VINE2;
                b.img = MS.Assets.Images.VINE3;
                c.img = MS.Assets.Images.VINE1;
            }
            else {
                a.img = MS.Assets.Images.VINE3;
                b.img = MS.Assets.Images.VINE1;
                c.img = MS.Assets.Images.VINE2;
            }
        }
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
    }
}