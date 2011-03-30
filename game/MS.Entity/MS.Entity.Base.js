MS.Entity.Base = function() {
    this.xPos = 0;
    this.yPos = 0;
    this.width = 0;
    this.height = 0;
    this.tangible = false;
    this.id = null;
    this.img = null;
    this.type = null;
    
    this.update = function() {};
    this.draw = function() {};
    
    this.setDimensions = function(width, height) {
        this.width = width;
        this.height = height;
    }
    
    this.setPos = function(x, y) {
        this.xPos = x;
        this.yPos = y;
    }
}