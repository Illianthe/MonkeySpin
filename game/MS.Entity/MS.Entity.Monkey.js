MS.Entity.Monkey = function() {
    /***************************************************************************
     * Private methods and variables
     **************************************************************************/
    
    var _xPos;
    var _yPos;
    var _width;
    var _height;
    
    /***************************************************************************
     * Private methods and variables
     **************************************************************************/
    
    var Monkey = {
        update : function() {
            
        },
        
        render : function() {
            // Only render if object has world coordinates
            if (_xPos != null && _yPos != null) {
                
            }
        },
        
        getPos : function() {
            return {
                xPos : _xPos,
                yPos : _yPos
            }
        },
        
        setPos : function(x, y) {
            _xPos = x;
            _yPos = y;
        },
        
        spin : function() {
            
        },
        
        jump : function() {
            
        },
        
        climb : function() {
            
        }
    }
    return Monkey;
}