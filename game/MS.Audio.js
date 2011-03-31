MS.Audio = {
    /**
     * Dynamically created audio elements
     */
    menuBg : null,  // Menu background music
    gameBg : null,  // Game background music
    
    Track : {
        MENUBG : 'menuMusic',
        GAMEBG : 'gameMusic'
    },
    
    init : function() {
        DE.Util.log('AUDIO: Subsystem initialized');
        
        // Add audio elements
        this.menuBg = new Audio('resources/music/menubg.mp3');
        this.gameBg = new Audio('resources/music/gamebg.wav');
        
        this.setLooping(this.menuBg);
        this.setLooping(this.gameBg);
    },
    
    /**
     * void play(Track track)
     * Starts playing the music track specified
     */
    play : function(track) {
        switch (track) {
            case this.Track.MENUBG:
                this.menuBg.play();
                break;
            case this.Track.GAMEBG:
                this.gameBg.play();
                break;
        }
    },
    
    /**
     * void stop(Track track)
     * Stops playing the music track specified
     */
    stop : function(track) {
        switch (track) {
            case this.Track.MENUBG:
                this.menuBg.pause();
                this.menuBg.currentTime = 0;
                break;
            case this.Track.GAMEBG:
                this.gameBg.pause();
                this.gameBg.currentTime = 0;
                break;
        }
    },
    
    /**
     * void setLooping(<audio> elt)
     * Makes a track continuously loop
     */
    setLooping : function(elt) {
        elt.addEventListener(
            'ended',
            function() {
                this.currentTime = 0;
            },
            false
        )
    }
}