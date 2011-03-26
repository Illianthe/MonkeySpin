MS.Entity.Base = function() {
    this.xPos = null;
    this.yPos = null;
    this.width = null;
    this.height = null;
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