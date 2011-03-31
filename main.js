$(document).ready(function() {
    DE.init();
    MS.init();
    
    // Binding events for menu music
    $('#menuMusic1').bind('ended', function() {
        this.currentTime = 0;
        this.pause();
        $('#menuMusic2')[0].play();
    });
    $('#menuMusic2').bind('ended', function() {
        this.currentTime = 0;
        this.pause();
        $('#menuMusic1')[0].play();
    });
    
    // Binding events for game music
    $('#gameMusic1').bind('ended', function() {
        this.currentTime = 0;
        this.pause();
        $('#gameMusic2')[0].play();
    });
    $('#gameMusic2').bind('ended', function() {
        this.currentTime = 0;
        this.pause();
        $('#gameMusic1')[0].play();
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