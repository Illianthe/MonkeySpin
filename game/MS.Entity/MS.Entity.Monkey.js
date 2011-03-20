MS.Entity.Monkey = function() {
    return $.extend(true, {}, MS.Entity.Base, {
        velocity : 5,            // Falling speed
        dirty : true,            // Redraw?
        orientation : 'left',    // Orientation on the vines
        spinning : false,
        spinDelay : null,
        jumping : false,
        jumpDelay : null,
        climbing : false,
        climbDelay : null,
    
        update : function() {
            // Move
            this.yPos += this.velocity;
            
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
            if (this.spinning && time - this.spinDelay > 500) {
                this.spin();
            }
        },
        
        draw : function() {
            if (this.dirty) {
                MS.Renderer.draw(this, MS.Entity.Entities.MONKEY);
            }
            this.dirty = false;
        },
        
        spin : function() {
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
        },
        
        jump : function() {
            this.jumping = false;
        },
        
        climb : function() {
            
        }
    });
}