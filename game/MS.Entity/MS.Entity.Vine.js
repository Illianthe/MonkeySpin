MS.Entity.Vine = function() {
    return $.extend(true, {}, MS.Entity.Base, {
        type : MS.Entity.Entities.VINE,
        
        draw : function() {
            MS.Renderer.draw(this, MS.Entity.Entities.VINE);
        }
    });
}