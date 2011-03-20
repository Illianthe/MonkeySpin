MS.Entity.Monkey = function() {
    return $.extend(true, {}, MS.Entity.Base, {
        velocity : null,
    
        update : function() {
            var P = MS.Game.Player;
            var action = P.processAction();
            switch (action) {
                case P.Actions.CLIMB:
                    this.climb();
                    break;
                case P.Actions.JUMP:
                    this.jump();
                    break;
                case P.Actions.SPIN:
                    this.spin();
                    break;
            }
        },
        
        spin : function() {
            
        },
        
        jump : function() {
            
        },
        
        climb : function() {
            
        }
    });
}