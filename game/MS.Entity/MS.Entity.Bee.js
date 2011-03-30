MS.Entity.Bee = function() {
    this.type = MS.Entity.Entities.BEE;

    this.draw = function() {
        if (this.tangible) {
            MS.Renderer.draw(this, MS.Entity.Entities.BEE);
        }
    },
    
    this.collide = function() {
        MS.Game.Player.character.die();
    }
}

MS.Entity.Bee.prototype = new MS.Entity.Base();