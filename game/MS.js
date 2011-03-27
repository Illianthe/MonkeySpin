var MS = {
    loops : 0,
    tick : 0,
    nextTick : null,
    time : null,
    
    init : function() {
        MS.Renderer.init();
        
        // Dynamically change resolution of the viewport
        $('#viewport').css({
            'width' : MS.Config.Resolution.WIDTH,
            'height' : MS.Config.Resolution.HEIGHT
        });
        
        // First state
        DE.StateManager.push(MS.State.Preload);
        
        this.tick = 1000 / MS.Config.FPS;
        setInterval(MS.run, 1000 / MS.Config.REFRESHRATE);
    },
    
    run : function() {
        this.loops = 0;
        this.nextTick = (new Date).getTime();
        
        // If there is a slowdown, update tries to catch up
        do {
            this.time = (new Date).getTime();
            DE.StateManager.update();
            this.nextTick += this.tick;
            this.loops += 1;
        }
        while (this.time >= this.nextTick && this.loops < MS.Config.MAXFRAMESKIP);
        
        // Draw only when there is an update
        if (this.loops) {
            DE.StateManager.draw();
        }
    }
};