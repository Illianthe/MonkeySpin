MS.Renderer = {
    dirty : false,
    
    staticCanvas : null,
    staticContext : null,
    monkeyCanvas : null,
    monkeyContext : null,
    cameraYPivot : MS.Config.Map.TILESIZE,
    
    // For scrolling backgrounds
    bgCloudsPos : 0,
    bgTreesPos : 0,
    
    init : function() {
        this.staticCanvas = $('#staticCanvas')[0];
        this.staticContext = this.staticCanvas.getContext("2d");
        this.staticCanvas.width = MS.Config.Resolution.WIDTH;
        this.staticCanvas.height = MS.Config.Resolution.HEIGHT;
        
        this.monkeyCanvas = $('#monkeyCanvas')[0];
        this.monkeyContext = this.monkeyCanvas.getContext("2d");
        this.monkeyCanvas.width = MS.Config.Resolution.WIDTH;
        this.monkeyCanvas.height = MS.Config.Resolution.HEIGHT;
        
        // Center canvas
        this.staticContext.translate(20, 0);
        this.monkeyContext.translate(20, 0);
        
        this.dirty = false;
    },
    
    update : function() {
        this.dirty = true;
    },
    
    /**
     * void draw(Entity obj, Entity.Entities type)
     * Draws entities to the rendering surface. Currently, the camera
     * pivots around the monkey's position.
     */
    draw : function(obj, type) {
        if (this.dirty) {
            this.staticContext.clearRect(-50, 0, MS.Config.Resolution.WIDTH + 50, MS.Config.Resolution.HEIGHT);
            this.dirty = false;
        }
        switch (type) {
            case MS.Entity.Entities.BANANA:
                this.staticContext.drawImage(
                    obj.img,
                    obj.xPos,
                    obj.yPos - MS.Game.Player.character.yPos
                );
                break;
            case MS.Entity.Entities.BEE:
                this.staticContext.fillStyle = '#ff6600';
                this.staticContext.fillRect(obj.xPos, obj.yPos - MS.Game.Player.character.yPos, 25, 25);
                break;
            case MS.Entity.Entities.MONKEY:
                // Clear previous instance and redraw
                this.monkeyContext.clearRect(0, this.cameraYPivot, MS.Config.Resolution.WIDTH, obj.height);
                this.monkeyContext.drawImage(
                    obj.img,
                    obj.xPos,
                    this.cameraYPivot
                );
                break;
            case MS.Entity.Entities.BRANCH:
                this.staticContext.drawImage(
                    obj.img,
                    obj.xPos,
                    obj.yPos - MS.Game.Player.character.yPos
                );
                break;
            case MS.Entity.Entities.VINE:
                this.staticContext.drawImage(
                    obj.img,
                    obj.xPos,
                    obj.yPos - MS.Game.Player.character.yPos
                );
                break;
        }        
    },
    
    clear : function(obj, type) {
        switch (type) {
            case MS.Entity.Entities.BANANA:
                break;
            case MS.Entity.Entities.BEE:
                break;
            case MS.Entity.Entities.MONKEY:
                break;
            case MS.Entity.Entities.BRANCH:
                break;
            case MS.Entity.Entities.VINE:
                break;
        }
    },
    
    drawBackground : function() {
        this.transform('bg_0_1', 0, this.bgCloudsPos, 0);
        this.transform('bg_0_2', 0, this.bgCloudsPos, 0);
        this.transform('bg_1_1', 0, this.bgTreesPos, 0);
        this.transform('bg_1_2', 0, this.bgTreesPos, 0);
        
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
        var elt = document.getElementById(id);
        elt.style.WebkitTransform = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)';
        elt.style.MozTransform = 'translate(' + x + 'px, ' + y + 'px)';
        elt.style.OTransform = 'translate(' + x + 'px, ' + y + 'px)';
        elt.style.msTransform = 'translate(' + x + 'px, ' + y + 'px)';
    }
}