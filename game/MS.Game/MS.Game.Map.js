MS.Game.Map = {
    staticMap : null,         // Base map for the "core" unmoving tiles: vines, bananas, etc.
    
    start : function() {
        // Construct world tiles
        this.staticMap = new Array(MS.Config.Map.XTILECOUNT);
        for (var i = 0; i < MS.Config.Map.XTILECOUNT; i += 1) {
            this.staticMap[i] = new Array(MS.Config.Map.YTILECOUNT);
        };
        
        // Initialize
        for (var i = 0; i < MS.Config.Map.XTILECOUNT; i += 1) {
            for (var j = 0; j < MS.Config.Map.YTILECOUNT; j += 1) {
                // Essentially build a linked list of objects for each tile position
                this.staticMap[i][j] = new Array();
            };
        };
    },
    
    /**
     * void draw()
     * Iterates through the objects in the map and executes their
     * internal draw function
     */
    draw : function() {
        for (var i = 0; i < MS.Config.Map.XTILECOUNT; i += 1) {
            for (var j = 0; j < MS.Config.Map.YTILECOUNT; j += 1) {
                var length = this.staticMap[i][j].length;
                for (var k = 0; k < length; k += 1) {
                    this.staticMap[i][j][k].draw();
                }
            }
        }
    },
    
    /**
     * void clearTile(Map map, int x, int y)
     * Clears all objects residing in map[x][y]
     */
    clearTile : function(map, x, y) {
        map[x][y] = new Array();
    },
    
    /**
     * void addObject(Entity obj, Map map, int x, int y)
     * Adds a new object to map[x][y]
     */
    addObject : function(obj, map, x, y) {
        map[x][y].push(obj);
    },
    
    /**
     * array findNeighbours(Entity obj)
     * Takes an entity (with corresponding positions and dimensions) and
     * returns the tiles that it overlaps
     */
    findNeighbours : function(obj) {
        var result = new Array();
        var pos = obj.getPos();
        var dim = obj.getDimensions();
    }
}