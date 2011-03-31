MS.Intro = {
        keyEventListener_enabled: false,
        callbackFunction: null,
        startTime : null,
        
        showScreen : function(callback){
            $('#intro').show();
            $('#introFrame')[0].src = 'intro.htm';
            this.callbackFunction = callback;
                
            if (!this.keyEventListener_enabled) {
                DE.InputManager.Keyboard.subscribe(this.keyEventListener);
                MS.Future.keyEventListener_enabled = true;
            }
            
            this.startTime = new Date().getTime();
        },
        
        hideScreen: function(){
            $('#intro').hide();
            MS.State.showMain();
                
            if (MS.Future.callbackFunction != null){
                    MS.Future.callbackFunction();
                    MS.Future.callbackFunction = null;
            }
                            
            if (!this.keyEventListener_enabled) {
                DE.InputManager.Keyboard.unsubscribe(this.keyEventListener);
                this.keyEventListener_enabled = false;
            }
        },              
                        
        keyEventListener: function(event) {
            if (event.which == '13' || event.which == '32') { // Enter or space
                MS.Intro.hideScreen();
                event.preventDefault();
            }
        },
        
        autoHide : function(time) {
            if (time - this.startTime > 10000) {
                this.hideScreen();
            }
        }
};