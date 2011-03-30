MS.Game.Score = {
    score : 0,

    Event : {
        SLIDE : 0,
        COLLECTBANANA : 1
    },

    start : function() {
        this.score = 0;
    },

    /**
     * void increment(Event event, mixed arg1)
     * Increments the score based on an event in
     * the game. Extra parameters are used as needed.
     */
    increment : function(event, arg1) {
        switch (event) {
            case this.Event.SLIDE:
                // arg1 is the current velocity of the monkey
		this.score += arg1;
                break;
            case this.Event.COLLECTBANANA:
                this.score += 5;
                break;
        }
    }
}
