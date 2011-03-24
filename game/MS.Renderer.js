MS.Renderer = {
    vineCanvas : null,
    vineContext : null,
    monkeyCanvas : null,
    monkeyContext : null,
    cameraYPivot : MS.Config.Map.TILESIZE,
    
    // For scrolling backgrounds
    bgCloudsPos : 0,
    bgTreesPos : 0,
    
    init : function() {
        this.vineCanvas = $('#vinecanvas')[0];
        this.vineContext = this.vineCanvas.getContext("2d");
        this.vineCanvas.width = MS.Config.Resolution.WIDTH;
        this.vineCanvas.height = MS.Config.Resolution.HEIGHT;
        
        this.monkeyCanvas = $('#monkeycanvas')[0];
        this.monkeyContext = this.monkeyCanvas.getContext("2d");
        this.monkeyCanvas.width = MS.Config.Resolution.WIDTH;
        this.monkeyCanvas.height = MS.Config.Resolution.HEIGHT;
        
        // Center canvas
        this.vineContext.translate(20, 0);
        this.monkeyContext.translate(20, 0);
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
                this.monkeyContext.clearRect(0, 0, this.monkeyCanvas.width, this.monkeyCanvas.height);
                //this.monkeyContext.fillStyle = '#993300';
                //this.monkeyContext.fillRect(obj.xPos, this.cameraYPivot, obj.width, obj.height);
                this.monkeyContext.drawImage(
                    obj.img,
                    obj.xPos,
                    this.cameraYPivot
                );
                break;
            case E.VINE:
                this.vineContext.drawImage(
                    obj.img,
                    obj.xPos,
                    obj.yPos - MS.Game.Player.character.yPos
                );
                break;
        }        
    },
    
    drawBackground : function() {
        this.transform('#bg_0_1', 0, this.bgCloudsPos, 0);
        this.transform('#bg_0_2', 0, this.bgCloudsPos, 0);
        this.transform('#bg_1_1', 0, this.bgTreesPos, 0);
        this.transform('#bg_1_2', 0, this.bgTreesPos, 0);
        
        this.bgCloudsPos -= 1;
        this.bgTreesPos -= 3;
        
        if (this.bgCloudsPos <= -MS.Assets.Images.BGCLOUDS.height) {
            this.bgCloudsPos = 0;
        }
        if (this.bgTreesPos <= -MS.Assets.Images.BGTREES.height) {
            this.bgTreesPos = 0;
        }
    },
    
    transform : function(id, x, y, z) {
        $(id).css({
            '-webkit-transform' : 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)',
            '-moz-transform' : 'translate(' + x + 'px, ' + y + 'px)',
            '-o-transform' : 'translate(' + x + 'px, ' + y + 'px)',
            '-ms-transform' : 'translate(' + x + 'px, ' + y + 'px)'
        });
    }
}