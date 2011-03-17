MS.Entity = {
    /**
     * obj create(string entity)
     * Creates an entity and returns it to the calling method
     */
    create : function(entity) {
        var result = null;
        switch (entity) {
            case 'Monkey':
                result = MS.Entity.Monkey();
        }
        return result;
    },
    
    /**
     * void destroy(obj entity)
     */
    destroy : function(entity) {
        entity = null;
    }
}