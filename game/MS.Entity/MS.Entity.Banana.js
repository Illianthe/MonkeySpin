MS.Entity.Banana = function() {
    this.type = MS.Entity.Entities.BANANA;
    this.img = MS.Assets.Images.BANANA;
    this.width = 21;
    this.height = 40;
    this.dirty = false;
    this.pop = false;

    this.draw = function() {
        if (this.tangible) {
            MS.Renderer.draw(this, MS.Entity.Entities.BANANA);
            if (this.pop) {
                this.showBanana();
                this.tangible = false;
                this.dirty = true;
            }
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