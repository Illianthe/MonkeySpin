MS.Game.Player = {
    nextAction : null,
    character : null,
    movement : 0,        // How much the player has moved
    
    /**
     * Enumerator - list of possible actions that the player can take
     */
    Actions : {
        JUMP : 'jump',
        SPIN : 'spin',
        CLIMB : 'climb'
    },
    
    /**
     * void setAction(MS.Game.Player.Actions action)
     * Set next action to be processed
     */
    setAction : function(action) {
        DE.Util.log('GAME: Queued ' + action + ' action');
        this.nextAction = action;
    },
    
    /**
     * MS.Game.Player.Actions processAction()
     * Gets the next action queued and returns it, setting the queue to null
     */
    processAction : function() {
        var result = this.nextAction;
        nextAction = null;
        return result;
    },
    
    start : function() {
        this.nextAction = null;
        this.character = null;
        this.movement = 0;
    },
    
    update : function() {
        this.character.update();
        this.character.yPos += 10;
        MS.Game.Map.range += 10;
    }
}