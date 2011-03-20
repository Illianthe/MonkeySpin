MS.Entity.Base = {
    xPos : null,
    yPos : null,
    width : null,
    height : null,
    id : null,
    img : null,
    type : null,
    
    update : {},
    draw : {},
    
    setPos : function(x, y) {
        this.xPos = x;
        this.yPos = y;
    },
    
    setDimensions : function(width, height) {
        this.width = width;
        this.height = height;
    },
}