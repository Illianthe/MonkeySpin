DE.Renderer = {};
DE.Renderer.Object = {
    // void create(string id, [string x], [string y], [string width], [string height])
    // Create element on rendering surface
    create : function(id, x, y, width, height) {
        var _x = x || 'auto';
        var _y = y || 'auto';
        var _width = width || 'auto';
        var _height = height || 'auto';
        $html = $('<div id="' + id + '"></div>').css({
            width : _width,
            height : _height,
            left : _x,
            top : _y
        });
        $('#viewport').append($html);
    },
    
    // void destroy(string id)
    // Delete element from rendering surface
    destroy : function(id) {
        $('#' + id, '#viewport').remove();
    },
    
    // void translate(string id, string x, string y)
    // Move object to a new position
    translate : function(id, x, y) {
        $('#' + id).css({
            'left' : x,
            'top' : y
        })
    }
};