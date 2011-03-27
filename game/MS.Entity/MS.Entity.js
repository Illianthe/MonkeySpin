MS.Entity = {
    _id : 0,    // Generate object with this id
    
    Entities : {
        BANANA : 'Banana',
        BEE : 'Bee',
        MONKEY : 'Monkey',
        VINE : 'Vine'
    },
    
    /**
     * obj create(string entity, [int x], [int y], [int width], [int height])
     * Creates an entity and returns it to the calling method
     */
    create : function(entity, x, y, width, height) {
        var result = null;
        switch (entity) {
            case this.Entities.BANANA:
                result = new MS.Entity.Banana();
                break;
            case this.Entities.BEE:
                result = new MS.Entity.Bee();
                break;
            case this.Entities.MONKEY:
                result = new MS.Entity.Monkey();
                break;
            case this.Entities.VINE:
                result = new MS.Entity.Vine();
                break;
            default:
                DE.Util.log('GAME: Attempting to create a non-existent entity');
        }
        if (result != null) {
            result.setPos(x || 0, y || 0);
            result.setDimensions(width || 0, height || 0);
            result.id = this._id;
            this._id += 1;
        }
        return result;
    },
    
    /**
     * obj createAtTile(string entity, int mapX, int mapY, [int xOffset],
     *     [int yOffset], [int width], [int height]);
     * Creates an entity using map data to augment positioning
     */
    createAtTile : function(entity, mapX, mapY, xOffset, yOffset, width, height) {
        var x = mapX * MS.Config.Map.TILESIZE + (xOffset || 0);
        var y = mapY * MS.Config.Map.TILESIZE + (yOffset || 0);
        return this.create(entity, x, y, width, height);
    },
    
    /**
     * void destroy(obj entity)
     */
    destroy : function(entity) {
        entity = null;
    },
    
    resetId : function() {
        _id = 0;
    }
}