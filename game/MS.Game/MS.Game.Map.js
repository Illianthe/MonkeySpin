MS.Game.Map = {
    staticMap : null,  // Base map for the "core" unmoving tiles: vines, bananas, etc.
    buffer : null,  // Preload data for next row in the map
    range : 0,  // Used to determine when to preload data (i.e. when monkey is in range)
    lastRow : 0,  // Index of the last row vector
    
    scenarios : new Array(),  // XML containing scenarios
    curScenario : 0,
    curScenarioRow : 0,
    
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
        this.curScenario = 0;
        
        // Create objects on the map for later use
        for (var i = 0; i < MS.Config.Map.XTILECOUNT; i += 1) {
            for (var j = 0; j < MS.Config.Map.YTILECOUNT; j += 1) {
                // Even columns
                if (i % 2 == 0) {
                    var banana = MS.Entity.createAtTile(MS.Entity.Entities.BANANA, i, j);
                    this.addObject(banana, this.staticMap, i, j);
                    var bee = MS.Entity.createAtTile(MS.Entity.Entities.BEE, i, j);
                    this.addObject(bee, this.staticMap, i, j);
                }
                else {
                    var vine =  MS.Entity.createAtTile(MS.Entity.Entities.VINE, i, j, 18, 0, 5, 40);
                    this.addObject(vine, this.staticMap, i, j);
                }
            }
        }

        // Initialize state
        for (var j = 0; j < MS.Config.Map.YTILECOUNT; j += 1) {
            var row = $(this.getRowFromScenario()).text();
            for (var i = 0; i < MS.Config.Map.XTILECOUNT; i += 1) {
                var obj = row[i];
                this.processEntity(obj, this.staticMap[i][j]);
            }
            this.lastRow += 1;
        }
    },
    
    update : function() {
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
    
    findEntity : function(arr, type) {
        for (var i = 0; i < arr.length; i += 1) {
            if (arr[i].type == type) {
                return arr[i];
            }
        }
        return null;
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
        var row = $(this.getRowFromScenario()).text();
        for (var i = 0; i < this.buffer.length; i += 1) {
            var obj = row[i];
            if (this.buffer[i].length > 0) {
                this.processEntity(obj, this.buffer[i]);
            }
        }
        this.lastRow += 1;
    },
    
    getRowFromScenario : function() {
        var maxRow = $(this.scenarios[this.curScenario]).attr('rows');
        if (this.curScenarioRow == maxRow) {
            // End of scenario - switch
            this.curScenarioRow = 0;
            var $links = $(this.scenarios[this.curScenario]).find('link');
            this.curScenario = parseInt($links.eq(DE.Util.rand(0, $links.length - 1)).attr('to'));
            DE.Util.log('GAME: Switching to scenario ' + this.curScenario);
        }
        var result = $(this.scenarios[this.curScenario]).find('row')[this.curScenarioRow];
        this.curScenarioRow += 1;
        return result;
    },
    
    processEntity : function(entity, container) {
        var origEntity;
        switch (entity) {
            // Blank
            case '-': {
                for (var i = 0; i < container.length; i += 1) {
                    container[i].tangible = false;
                    container[i].yPos = this.lastRow * MS.Config.Map.TILESIZE;
                }
                break;
            }
            // Bee
            case 'B': {
                origEntity = this.findEntity(container, MS.Entity.Entities.BEE);
                origEntity.yPos = this.lastRow * MS.Config.Map.TILESIZE;
                origEntity.tangible = true;
                break;
            }
            // Banana
            case 'N': {
                origEntity = this.findEntity(container, MS.Entity.Entities.BANANA);
                origEntity.yPos = this.lastRow * MS.Config.Map.TILESIZE;
                origEntity.tangible = true;
                break;
            }
            // Vine
            case 'V': {
                origEntity = this.findEntity(container, MS.Entity.Entities.VINE);
                origEntity.tangible = true;
                origEntity.yPos = this.lastRow * MS.Config.Map.TILESIZE;
                origEntity.img = MS.Assets.Images.VINE2;
                break;
            }
        }
    }
}