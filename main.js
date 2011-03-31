$(document).ready(function() {
    DE.init();
    MS.init();	
    MS.Video.preloadVideos();
});

// Object.create() was introduced in JavaScript 1.8.5, meaning it isn't
// implemented in all modern browsers yet. This is a workaround
// until that time comes...
if (typeof Object.create != 'function') {
    Object.create = function(obj) {
        function fn() {}
        fn.prototype = obj;
        return new fn();
    };
}