MS.Game.Map = {
    staticMap : null,    // Base map for the "core" unmoving tiles: vines, bananas, etc.
    buffer : null,       // Preload data for next row in the map
    range : 0,           // Used to determine when to preload data (i.e. when monkey is in range)
    lastRow : 0,         // Index of the last row vector
    
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
        
        this.buffer = null;
        this.range = 0;
        // Starting point for rows being generated next
        this.lastRow = MS.Config.Map.YTILECOUNT;
    },
    
    update : function() {
        if (this.buffer == null) {
            this.preloadRow(this.generateRow());
        }
        
        if (this.range > MS.Config.Map.TILESIZE) {
            this.deleteFirstRow();
            this.addLastRow(this.buffer);
            this.buffer = null;
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
            this.staticMap[i].push(row[i]);
        }
    },
    
    deleteFirstRow : function() {
        for (var i = 0; i < MS.Config.Map.XTILECOUNT; i += 1) {
            this.staticMap[i].shift();
        }
    },
    
    /**
     * void preloadRow(array obj)
     * Takes an array of Entities and adds it to the row buffer
     */
    preloadRow : function(obj) {
        // Initialize row buffer
        this.buffer = new Array(MS.Config.Map.XTILECOUNT);
        for (var i = 0; i < MS.Config.Map.XTILECOUNT; i += 1) {
            if (obj[i] != undefined && obj[i] != null) {
                this.buffer[i] = new Array(obj[i]);
            }
            else {
                this.buffer[i] = new Array();
            }
        }
    },
    
    /**
     * array generateRow()
     * Generates the entities needed to add to the next row in the map.
     * This should ideally be parsed from a JSON/XML file (if scenarios
     * are static); otherwise random generation logic is needed.
     */
    generateRow : function() {
        this.lastRow += 1;
        
        // Temporarily generate a whole bunch of vines
        var result = new Array(MS.Config.Map.XTILECOUNT);
        var a = MS.Entity.createAtTile('Vine', 1, this.lastRow, 18, 0, 10, 40);
        var b = MS.Entity.createAtTile('Vine', 3, this.lastRow, 18, 0, 10, 40);
        var c = MS.Entity.createAtTile('Vine', 5, this.lastRow, 18, 0, 10, 40);
        var rand = DE.Util.rand(1, 3);
        if (rand == 1) {
            a.img = MS.Assets.Images.VINE1;
            b.img = MS.Assets.Images.VINE2;
            c.img = MS.Assets.Images.VINE3;
        }
        else if (rand == 2) {
            a.img = MS.Assets.Images.VINE2;
            b.img = MS.Assets.Images.VINE3;
            c.img = MS.Assets.Images.VINE1;
        }
        else {
            a.img = MS.Assets.Images.VINE3;
            b.img = MS.Assets.Images.VINE1;
            c.img = MS.Assets.Images.VINE2;
        }
        result[1] = a;
        result[3] = b;
        result[5] = c;
        
        return result;
    }
}