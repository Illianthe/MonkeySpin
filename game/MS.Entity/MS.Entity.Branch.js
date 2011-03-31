MS.Entity.Branch = function() {
    this.type = MS.Entity.Entities.BRANCH;

    this.draw = function() {
        if (this.tangible) {
            MS.Renderer.draw(this, MS.Entity.Entities.BRANCH);
        }
        else {
            MS.Renderer.clear(this, MS.Entity.Entities.BRANCH);
        }
    }
}

MS.Entity.Branch.prototype = new MS.Entity.Base();