MS.Entity.Vine = function() {
    return $.extend(true, {}, MS.Entity.Base, {
        draw : function() {
            MS.Renderer.draw(this, MS.Entity.Entities.VINE);
        }
    });
}