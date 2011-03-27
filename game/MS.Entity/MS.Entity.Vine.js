MS.Entity.Vine = function() {
    this.type = MS.Entity.Entities.VINE;

    this.draw = function() {
        if (this.tangible) {
            MS.Renderer.draw(this, MS.Entity.Entities.VINE);
        }
        else {
            MS.Renderer.clear(this, MS.Entity.Entities.VINE);
        }
    }
}

MS.Entity.Vine.prototype = new MS.Entity.Base();