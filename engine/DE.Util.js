/**
 * General utility functions
 */
DE.Util = {
    /**
     * void log(mixed message)
     * Logs a message and displays it in an appropriate manner
     * (e.g. browser console if it exists).
     */
    log : function(msg) {
        if (typeof(console) != 'undefined' && DE.Config.DEBUG) {
            console.log(msg);
        }
    },
    
    /**
     * object preloadImages(object images, function callback, [obj context])
     * Loads images into the browser cache to prevent flickering and other
     * rendering "bugs" during execution. Returns when everything has
     * finished loading. The callback function executes once for every image
     * after it has fully loaded (i.e. is in cache).
     */
    preloadImages : function(images, callback, context) {
        var result = {};
        var scope = context || window;
        for (elt in images) {
            result[elt] = new Image();
            result[elt].src = images[elt];
            $(result[elt]).load(function() {
                if (typeof callback == 'function') {
                    callback.call(scope);
                }
            });
        }
        return result;
    },
    
    /**
     * int mod(int i, int j)
     * Modulo operation with i as the dividend and j as the divisor.
     * This function always returns a positive number (even when the dividend
     * is negative), as opposed to JavaScript's native % operator.
     */
    mod : function(i, j) {
        return ((i % j) + j) % j;
    },
    
    /**
     * int rand(int min, int max)
     * Generates a random number between min and max inclusive
     */
    rand : function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};