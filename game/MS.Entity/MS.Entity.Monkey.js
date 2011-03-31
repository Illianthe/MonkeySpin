MS.Entity.Monkey = function() {
    this.img = MS.Assets.Images.MONKEYR1;
    this.dirty = true;  // Redraw?
    this.oldXPos = 0; // Last position of monkey
    this.oldYPos = 0;
    this.startTime = new Date().getTime(); // Game start time (to adjust speed)
    this.curTime = null,
    this.velocity = 3;  // Falling speed
    this.totalMovement = 0;  // Distance moved in total
    this.orientation = 'right';  // Orientation on the vines
    this.vine = 'middle';  // Attached to current vine
    this.hanging = true;  // Connected to a vine?
    this.spinning = false;  // Currently spinning?
    this.spinDelay = 0;
    this.jumping = false;  // Currently jumping?
    this.jumpDelay = 0;
    
    this.surfFrame = 1;
    this.surfDelay = 5;
    
    this.type = MS.Entity.Entities.MONKEY;

    this.update = function() {
        // Process input
        var P = MS.Game.Player;
        var action = P.processAction();
        if (action != null || !this.spinning || !this.jumping || !this.climbing) {
            switch (action) {
                case P.Actions.JUMP:
                    this.jumping = true;
                    this.jumpDelay = 0;
                    this.jump();
                    break;
                case P.Actions.SPINLEFT:
                    this.spinning = true;
                    this.spinDelay = 0;
                    this.spin('left');
                    break;
                case P.Actions.SPINRIGHT:
                    this.spinning = true;
                    this.spinDelay = 0;
                    this.spin('right');
                    break;
            }
        }
        
        this.curTime = new Date().getTime();
        // Adjust speed if enough time has elapsed
        if (this.curTime - this.startTime > 60000) {
            this.velocity = 7;
        }
        else if (this.curTime - this.startTime > 45000) {
            this.velocity = 6;
        }
        else if (this.curTime - this.startTime > 30000) {
            this.velocity = 5;
        }
        else if (this.curTime - this.startTime > 15000) {
            this.velocity = 4;
        }
        
        // Check for collisions
        this.hanging = false;
        this.collisionDetection();
        
        // Monkey must be hanging from a vine
        if (!this.hanging) {
            this.die();
        }
        
        // Move
        this.oldYPos = this.yPos;
        this.yPos += this.velocity;
        this.totalMovement += this.velocity;
        this.surf();
        MS.Game.Score.increment(MS.Game.Score.Event.SLIDE, this.velocity);
    }
    
    this.draw = function() {
        if (this.dirty) {
            MS.Renderer.draw(this, MS.Entity.Entities.MONKEY);
        }
        this.dirty = false;
    }
    
    this.spin = function(direction) {
        // Do nothing - same direction
        if (this.orientation == direction) {
            return;
        }
        
        this.oldXPos = this.xPos;
        if (this.orientation == 'left') {
            this.orientation = 'right';
            this.xPos += 45;
        }
        else {
            this.orientation = 'left';
            this.xPos -= 45;
        }
        this.spinning = false;
        this.surf();
    }
    
    this.jump = function() {
        this.oldXPos = this.xPos;
        if (this.orientation == 'right' && this.vine != 'right') {
            this.xPos += 35;
            this.orientation = 'left';
            this.vine = (this.vine == 'left') ? 'middle' : 'right';
        }
        else if (this.orientation == 'left' && this.vine != 'left') {
            this.xPos -= 35;
            this.orientation = 'right';
            this.vine = (this.vine == 'right') ? 'middle' : 'left';
        }
        this.jumping = false;
        this.dirty = true;
    }
    
    this.surf = function() {
        this.surfDelay -= 1;
        if (this.surfDelay == 0) {
            this.surfFrame = this.surfFrame % 7 + 1
            
            switch (this.surfFrame) {
                case 1:
                    this.img = (this.orientation == 'right') ?
                        MS.Assets.Images.MONKEYR1 :
                        MS.Assets.Images.MONKEYL1;
                    break;
                case 2:
                    this.img = (this.orientation == 'right') ?
                        MS.Assets.Images.MONKEYR2 :
                        MS.Assets.Images.MONKEYL2;
                    break;
                case 3:
                    this.img = (this.orientation == 'right') ?
                        MS.Assets.Images.MONKEYR3 :
                        MS.Assets.Images.MONKEYL3;
                    break;
                case 4:
                    this.img = (this.orientation == 'right') ?
                        MS.Assets.Images.MONKEYR4 :
                        MS.Assets.Images.MONKEYL4;
                    break;
                case 5:
                    this.img = (this.orientation == 'right') ?
                        MS.Assets.Images.MONKEYR5 :
                        MS.Assets.Images.MONKEYL5;
                    break;
                case 6:
                    this.img = (this.orientation == 'right') ?
                        MS.Assets.Images.MONKEYR6 :
                        MS.Assets.Images.MONKEYL6;
                    break;
                case 7:
                    this.img = (this.orientation == 'right') ?
                        MS.Assets.Images.MONKEYR7 :
                        MS.Assets.Images.MONKEYL7;
                    break;
            }
            
            this.surfDelay = 5;
            this.dirty = true;
        }
    },
    
    this.die = function() {
        DE.Util.log('GAME: Dying...');
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
        if (!obj.tangible || !this.isOverlapping(this, obj)) {
            return;
        }
        var E = MS.Entity.Entities;
        var M = MS.Game.Map.staticMap;
        switch (obj.type) {
            case E.VINE:
                this.hanging = true;
                break;
            case E.BANANA:
                obj.collide();
                break;
            case E.BEE:
                obj.collide();
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
