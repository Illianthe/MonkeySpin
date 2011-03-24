$(document).ready(function() {
    DE.init();
    MS.init();
    
    $('#music').bind('ended', function() {
        this.currentTime = 0;
        this.pause();
        $('#music2')[0].play();
    });
    $('#music2').bind('ended', function() {
        this.currentTime = 0;
        this.pause();
        $('#music')[0].play();
    });
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