MS.Entity.Banana = function() {
    this.type = MS.Entity.Entities.BANANA;

    this.draw = function() {
        if (this.tangible) {
            MS.Renderer.draw(this, MS.Entity.Entities.BANANA);
        }
    }
}

MS.Entity.Banana.prototype = new MS.Entity.Base();