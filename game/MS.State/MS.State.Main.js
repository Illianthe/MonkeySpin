MS.State.Main = {
    start : function() {
        DE.Util.log('MAIN : Starting state');
        MS.Menu.showMenu();
        console.log(MS.Game.Map);
    },
    
    exit : function() {
        DE.Util.log('MAIN : Exiting state');
    },
    
    draw : function() {
    },
    
    update : function() {
    }
};