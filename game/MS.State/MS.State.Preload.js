MS.State.Preload = {
    count : 0,         // Number of physical assets loaded
    totalCount : 0,    // Total number of assets
    percentage : 0,    // Percentage of assets loaded
    test : 0,
    
    start : function() {
        DE.Util.log('PRELOAD: Starting state');
    },
    
    exit : function() {
        DE.Util.log('PRELOAD: Exiting state');
    },
    
    draw : function() {
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
                var that = this;
                var next = function(event, type) {
                    DE.Util.log('PRELOAD: Event (' + type + ') triggered');
            
                    // Don't really care about the event - just continue on input
                    DE.InputManager.unsubscribeAll(next);
                    DE.StateManager.pop();
                    DE.StateManager.push(MS.State.Main);
                }
                DE.InputManager.subscribeAll(next);
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
    }
};