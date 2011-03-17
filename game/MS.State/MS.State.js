/**
 * Interface for modifying game states. MS.State is the object in which all requests
 * are first processed (i.e. the controller in a MVC model)
 * 
 * States of the game - each specific state has the following functions common to them:
 * - start() : called when state is initialized
 * - exit() : called when state is exiting (popped off the stack)
 * - draw() : called when the game loop attempts to render graphics
 * - update() : called when the game loop attempts to update game state
 **/
MS.State = {
    _curState : null,    // Current active state
    
    /**
     * void newGame()
     * Starts a new game. This is the handler that is triggered when, for example,
     * a "New Game" button is pressed.
     */
    newGame : function() {
        // Pop off intermediary states (game state should lie on top of the main state)
        while (_curState != MS.State.Main) {
            DE.StateManager.pop();
            _curState = DE.StateManager.getCurState();
        }
        
        _curState = DE.StateManager.push(MS.State.Game);
    },
    
    /**
     * void showMain()
     * Switch to the main menu.
     */
    showMain : function() {
        DE.StateManager.popAll();
        _curState = DE.StateManager.push(MS.State.Main);
    },
    
    /**
     * void showHelp()
     */
    showHelp : function() {
        DE.StateManager.push(MS.State.Help);
    },
    
    /**
     * void hideHelp()
     */
    hideHelp : function() {
        DE.StateManager.pop();
    },
    
    /**
     * void showOptions()
     */
    showOptions : function() {
        DE.StateManager.push(MS.State.Options);
    },
    
    /**
     * void hideOptions()
     */
    hideOptions : function() {
        DE.StateManager.pop();
    },
    
    /**
     * void showScores()
     */
    showScores : function() {
        DE.StateManager.push(MS.State.Scores);
    },
    
    /**
     * void hideScores()
     */
    hideScores : function() {
        DE.StateManager.pop();
    },
    
    /**
     * void showAbout()
     */
    showAbout : function() {
        DE.StateManager.push(MS.State.About);
    },
    
    /**
     * void hideAbout()
     */
    hideAbout : function() {
        DE.StateManager.pop();
    }
}