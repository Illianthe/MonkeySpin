MS.Game.Map = {
    staticMap : null,  // Base map for the "core" unmoving tiles: vines, bananas, etc.
    buffer : null,  // Preload data for next row in the map
    range : 0,  // Used to determine when to preload data (i.e. when monkey is in range)
    lastRow : 0,  // Index of the last row vector
    nextRow : 0,
    
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
        
        this.buffer = new Array();
        this.range = 0;
        // Starting point for rows being generated next
        this.lastRow = MS.Config.Map.YTILECOUNT;
        this.nextRow = 0;
    },
    
    update : function() {
        //if (this.buffer == null) {
        //    this.preloadRow(this.generateRow());
        //}
        
        if (this.range > MS.Config.Map.TILESIZE) {
            this.deleteFirstRow();
            this.modifyBuffer();
            this.addLastRow(this.buffer);
            this.range -= MS.Config.Map.TILESIZE;
        }
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
     * void addObject(Entity obj, Map map, int x, int y)
     * Adds a new object to map[x][y]
     */
    addObject : function(obj, map, x, y) {
        map[x][y].push(obj);
    },
    
    /**
     * obj findNeighbours(Entity obj)
     * Takes an entity (with corresponding positions and dimensions) and
     * returns the tiles that it overlaps
     */
    findNeighbours : function(obj, xOffset, yOffset) {
        var result = {};
        result.startX = Math.floor((obj.xPos - (xOffset || 0)) / MS.Config.Map.TILESIZE);
        result.startY = Math.floor((obj.yPos - (yOffset || 0)) / MS.Config.Map.TILESIZE);
        result.endX = Math.floor((obj.xPos + obj.width - (xOffset || 0)) / MS.Config.Map.TILESIZE);
        result.endY = Math.floor((obj.yPos + obj.height - (yOffset || 0)) / MS.Config.Map.TILESIZE);
        return result;
    },
    
    addLastRow : function(row) {
        for (var i = 0; i < MS.Config.Map.XTILECOUNT; i += 1) {
            this.staticMap[i].push(row.shift());
        }
    },
    
    deleteFirstRow : function() {
        for (var i = 0; i < MS.Config.Map.XTILECOUNT; i += 1) {
            var elt = this.staticMap[i].shift();
            this.buffer.push(elt);
        }        
    },
    
    modifyBuffer : function() {
        this.lastRow += 1;
        for (var i = 0; i < this.buffer.length; i += 1) {
            if (this.buffer[i].length > 0) {
                this.buffer[i][0].yPos = this.lastRow * MS.Config.Map.TILESIZE;
            }
        }
    }
}