MS.Game.Player = {
    nextAction : null,
    character : null,
    
    /**
     * Enumerator - list of possible actions that the player can take
     */
    Actions : {
        JUMP : 'jump',
        SPINLEFT : 'spinleft',
        SPINRIGHT :'spinright',
        CLIMB : 'climb'
    },
    
    /**
     * void setAction(MS.Game.Player.Actions action)
     * Set next action to be processed
     */
    setAction : function(action) {
        this.nextAction = action;
    },
    
    /**
     * MS.Game.Player.Actions processAction()
     * Gets the next action queued and returns it, setting the queue to null
     */
    processAction : function() {
        var result = this.nextAction;
        this.nextAction = null;
        return result;
    },
    
    start : function() {
        this.nextAction = null;
        this.character = null;
        
        MS.Game.Player.character = MS.Entity.create('Monkey', 135, 40, 60, 90);
    },
    
    update : function() {
        this.character.update();
        MS.Game.Map.range += this.character.velocity;
    },
    
    draw : function() {
        this.character.draw();
    }
}