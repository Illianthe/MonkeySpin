MS.State.Preload = {
    count : 0,         // Number of physical assets loaded
    totalCount : 0,    // Total number of assets
    percentage : 0,    // Percentage of assets loaded
    test : 0,
    
    start : function() {
        DE.Util.log('PRELOAD: Starting state');
        
        // Loading screen
        DE.Renderer.Object.create('title');
        DE.Renderer.Object.create('loading');
        
        DE.InputManager.changeContext(this);
    },
    
    exit : function() {
        DE.Util.log('PRELOAD: Exiting state');
        
        DE.Renderer.Object.destroy('title');
        DE.Renderer.Object.destroy('loading');
    },
    
    draw : function() {
        $('#title').html('Monkey Spin');
        $('#loading').html('Loading: ' + this.percentage + '% Completed');
    },
    
    update : function() {
        // If count is not set, we loop through the image object to...well, count
        if (!this.totalCount) {
            for (img in MS.Assets.ImageURLs) {
                this.totalCount += 1;
            }
            
            // First preload
            MS.Assets.Images = DE.Util.preloadImages(MS.Assets.ImageURLs, this.imageLoaded, this);
        }
        
        if (this.count == this.totalCount && typeof(this.update.subscribed) == 'undefined') {
            this.update.subscribed = true;
            
            // Minor change for when there are no assets to be loaded
            this.percentage = this.percentage || 100; 
            
            // Stall on loading screen in debugging mode
            if (DE.Config.DEBUG) {
                DE.InputManager.subscribeAll(this.next);
            }
            else {
                DE.StateManager.pop();
                DE.StateManager.push(MS.State.Main);
            }
        }
    },
    
    /**
     * void imageLoaded()
     * Callback function that triggers when images have finished loading
     */
    imageLoaded : function() {
        this.count += 1;
        this.percentage = (this.count / this.totalCount * 100).toFixed(0);
        DE.Util.log('PRELOAD: Percentage of images loaded: ' + this.percentage + '%');
    },
    
    /**
     * void next(obj event, string type)
     * Processes input to proceed to the next state
     */
    next : function(event, type) {
        DE.Util.log('PRELOAD: Event (' + type + ') triggered');
        
        // Don't really care about the event - just continue on input
        DE.InputManager.unsubscribeAll(this.next);
        DE.StateManager.pop();
        DE.StateManager.push(MS.State.Main);
    }
};