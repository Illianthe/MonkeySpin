MS.Entity.Banana = function() {
    this.type = MS.Entity.Entities.BANANA;
    this.img = MS.Assets.Images.BANANA;
    this.width = 21;
    this.height = 40;
    this.dirty = false;
    this.curTime = null;
    this.pop = false;
    this.popDelay = null;
    
    this.update = function() {
        this.curTime = new Date().getTime();
        
        // Show pop animation before erasing
        if (this.pop && this.curTime - this.popDelay >= 10) {
            this.showBanana();
            this.tangible = false;
            this.dirty = true;
        }
    }

    this.draw = function() {
        if (this.tangible) {
            MS.Renderer.draw(this, MS.Entity.Entities.BANANA);
        }
        else {
            if (this.dirty) {
                MS.Renderer.clear(this, MS.Entity.Entities.BANANA);
            }
        }
    },
    
    this.collide = function() {
        this.showPop();
    },
    
    this.showPop = function() {
        this.pop = true;
        this.popDelay = new Date().getTime();
        this.img = MS.Assets.Images.BANANAPOP;
        this.width = MS.Assets.Images.BANANAPOP.width;
        this.height = MS.Assets.Images.BANANAPOP.height;
    },
    
    this.showBanana = function() {
        this.pop = false;
        this.img = MS.Assets.Images.BANANA;
        this.width = MS.Assets.Images.BANANA.width;
        this.height = MS.Assets.Images.BANANA.height;
    }
}

MS.Entity.Banana.prototype = new MS.Entity.Base();