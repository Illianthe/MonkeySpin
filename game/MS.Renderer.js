MS.Renderer = {
    vineCanvas : null,
    vineContext : null,
    
    init : function() {
        this.vineCanvas = $('#vinecanvas')[0];
        this.vineContext = this.vineCanvas.getContext("2d");
        this.vineCanvas.width = MS.Config.Resolution.WIDTH;
        this.vineCanvas.height = MS.Config.Resolution.HEIGHT;
        
        // Center canvas
        this.vineContext.translate(20, 0);
    },
    
    /**
     * void draw(Entity obj, Entity.Entities type)
     * Draws entities to the rendering surface. Currently, the camera
     * pivots around the monkey's position.
     */
    draw : function(obj, type) {
        var E = MS.Entity.Entities;
        switch (type) {
            case E.BANANA:
                break;
            case E.MONKEY:
                break;
            case E.VINE:
                this.vineContext.drawImage(
                    obj.img,
                    obj.xPos,
                    obj.yPos - MS.Game.Player.character.yPos
                );
                break;
        }
    }
}