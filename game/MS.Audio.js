MS.Audio = {
    /**
     * Dynamically created audio elements
     */
    menuBg : null,  // Menu background music
    gameBg : null,  // Game background music
    
    totalTracks : 2,  // Total number of tracks that this obj contains
    loadedTracks : 0,  // For preloading
    
    Track : {
        MENUBG : 'menuMusic',
        GAMEBG : 'gameMusic'
    },
    
    init : function() {
        DE.Util.log('AUDIO: Subsystem initialized');
        
        // Add audio elements
        this.menuBg = new Audio('resources/music/menubg.mp3');
        this.gameBg = new Audio('resources/music/gamebg.mp3');
        
        // Make tracks loop
        this.setLooping(this.menuBg);
        this.setLooping(this.gameBg);
        
        // Preload resources
        this.preload(this.menuBg);
        this.preload(this.gameBg);
    },
    
    /**
     * void setLooping(<audio> elt)
     * Preloads all resources before continuing
     */
    preload : function(elt) {
        var that = this;
        elt.addEventListener(
            'canplaythrough',
            function() {
                that.loadedTracks += 1;
                DE.Util.log('AUDIO: Preloaded track');
            },
            false
        );
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