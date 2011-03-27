MS.Entity.Monkey = function() {
    this.dirty = true;             // Redraw?
    this.velocity = 5;             // Falling speed
    this.totalMovement = 0;
    this.orientation = 'right';    // Orientation on the vines
    this.vine = 'middle';          // Attached to current vine
    this.hanging = true;
    this.spinning = false;
    this.spinDelay = null;
    this.jumping = false;
    this.jumpDelay = null;
    this.climbing = false;
    this.climbDelay = null;
    
    this.type = MS.Entity.Entities.MONKEY;

    this.update = function() {
        // Process input
        var P = MS.Game.Player;
        var action = P.processAction();
        if (action != null || !this.spinning || !this.jumping || !this.climbing) {
            switch (action) {
                case P.Actions.CLIMB:
                    this.climb();
                    break;
                case P.Actions.JUMP:
                    this.jumping = true;
                    this.jumpDelay = new Date().getTime();
                    break;
                case P.Actions.SPIN:
                    this.spinning = true;
                    this.spinDelay = new Date().getTime();
                    break;
            }
        }
        
        // Process actions if they're still occurring
        var time = new Date().getTime();
        // Simulate spinning for half a second (animation)
        if (this.spinning && time - this.spinDelay > 0) {
            this.spin();
        }
        
        // Check for collisions
        this.hanging = false;
        this.collisionDetection();
        
        // Monkey must be hanging from a vine
        if (!this.hanging) {
            this.die();
        }
        
        // Move
        this.yPos += this.velocity;
        this.totalMovement += this.velocity;
    }
    
    this.draw = function() {
        if (this.dirty) {
            MS.Renderer.draw(this, MS.Entity.Entities.MONKEY);
        }
        this.dirty = false;
    }
    
    this.spin = function() {
        if (this.orientation == 'left') {
            this.orientation = 'right';
            this.xPos += 40;
        }
        else {
            this.orientation = 'left';
            this.xPos -= 40;
        }
        this.spinning = false;
        this.dirty = true;
    }
    
    this.jump = function() {
        this.jumping = false;
    }
    
    this.climb = function() {
        
    }
    
    this.die = function() {
        DE.Util.log('GAME: Dying');
    }
    
    /**
     * void collisionDetection()
     * Check surrounding tiles to see if this object collides
     * with any others
     */
    this.collisionDetection = function() {
        var tiles = MS.Game.Map.findNeighbours(this, 0, this.totalMovement);
        for (var x = tiles.startX; x <= tiles.endX; x += 1) {
            for (var y = tiles.startY; y <= tiles.endY; y += 1) {
                var M = MS.Game.Map.staticMap;
                var length = M[x][y].length;
                for (var i = 0; i < length; i += 1) {
                    this.processCollision(M[x][y][i], x, y, i);
                }
            }
        }
    }
    
    /**
     * void processCollision(Entity obj, [int x], [int y], [int i])
     * Takes an entity along with its position in the map
     * and checks for collisions
     */
    this.processCollision = function(obj, x, y, i) {
        if (!this.isOverlapping(this, obj)) {
            return;
        }
        var E = MS.Entity.Entities;
        var M = MS.Game.Map.staticMap;
        switch (obj.type) {
            case E.VINE:
                this.hanging = true;
                break;
            case E.BANANA:
                break;
        }
    }
    
    this.isOverlapping = function(obj1, obj2) {
        // Check if obj1 lies within the coordinates of obj2
        // using bounding box collision detection
        var result = false;
        if (obj1.xPos >= obj2.xPos && obj1.xPos <= obj2.xPos + obj2.width) result = true;
        if (obj1.xPos + obj1.width >= obj2.xPos && obj1.xPos + obj1.width <= obj2.xPos + obj2.width) result = true;
        if (obj1.yPos >= obj2.yPos && obj1.yPos <= obj2.yPos + obj2.height) result = true;
        if (obj1.yPos + obj1.height >= obj2.yPos && obj1.yPos + obj1.height <= obj2.yPos + obj2.height) result = true;
        return result;
    }
}

MS.Entity.Monkey.prototype = new MS.Entity.Base();