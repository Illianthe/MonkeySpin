var MS = {
    init : function() {
        MS.Renderer.init();
        
        // Dynamically change resolution of the viewport
        $('#viewport').css({
            'width' : MS.Config.Resolution.WIDTH,
            'height' : MS.Config.Resolution.HEIGHT
        });
        
        // First state
        DE.StateManager.push(MS.State.Preload);
        
        setInterval(MS.run, 1000 / MS.Config.REFRESHRATE);
    },
    
    run : function() {
        var loops = 0;
        var tick = 1000 / MS.Config.FPS;
        var nextTick = (new Date).getTime();
        
        // If there is a slowdown, update tries to catch up
        while ((new Date).getTime() >= nextTick && loops < MS.Config.MAXFRAMESKIP) {
            DE.StateManager.update();
            nextTick += tick;
            loops += 1;
        }
        
        // Draw only when there is an update
        if (loops) {
            DE.StateManager.draw();
        }
    }
};