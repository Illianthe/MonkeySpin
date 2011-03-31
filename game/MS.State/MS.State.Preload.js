MS.State.Preload = {
    count : 0,         // Number of physical assets loaded
    totalCount : 0,    // Total number of assets
    percentage : 0,    // Percentage of assets loaded
    test : 0,
    
    start : function() {
        DE.Util.log('PRELOAD: Starting state');
        
        // Parse JSON
        var that = this;
        $.ajax({
            async : false,
            type : 'GET',
            url : 'resources/data/scenarios.xml',
            dataType : 'xml',
            success : that.addScenarios,
            error : function() {
                DE.Util.log('PRELOAD: Error loading scenarios');
            }
        });
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
        
        if (this.count == this.totalCount && MS.Audio.loadedTracks == MS.Audio.totalTracks) {
            // Minor change for when there are no assets to be loaded
            this.percentage = this.percentage || 100; 
            
            MS.State.showMain();
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
    
    addScenarios : function(data) {
        // Place scenarios in map for later use
        var M = MS.Game.Map;
        $(data).find('scenario').each(function() {
            var id = $(this).attr('id');
            M.scenarios[parseInt(id)] = this;
        });
    }
};