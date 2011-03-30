MS.Entity.Banana = function() {
    this.type = MS.Entity.Entities.BANANA;
    this.img = MS.Assets.Images.BANANA;
    this.width = 21;
    this.height = 40;
    this.dirty = false;
    this.pop = false;
    this.popDelay = 0;

    this.draw = function() {
        if (this.tangible) {
            MS.Renderer.draw(this, MS.Entity.Entities.BANANA);
            if (this.pop && this.popDelay == 0) {
                this.showBanana();
                this.tangible = false;
                this.dirty = true;
            }
            this.popDelay = (this.popDelay == 0) ? 0 : this.popDelay - 1;
        }
        else {
            if (this.dirty) {
                MS.Renderer.clear(this, MS.Entity.Entities.BANANA);
            }
        }
    },
    
    this.collide = function() {
        if (!this.pop) {
            MS.Game.Score.increment(MS.Game.Score.Event.COLLECTBANANA);
            this.showPop();
        }
    },
    
    this.showPop = function() {
        this.pop = true;
        this.popDelay = 10;
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
