MS.Loading = {

	callbackFunction: null, 			/** Keep track of what to do after loading is done **/


	showScreen : function (callback){
				
		$("#loadingScreen").fadeIn();
		MS.Loading.callbackFunction = callback;
			
	
			
	},
	
	setProgress : function (percentComplete){
		
		$("#loadingProgress").css("width", percentComplete+"%");
		if (percentComplete == 100){
			MS.Loading.hideScreen();
		}
	},
	
	hideScreen : function (){
				
		$("#loadingScreen").fadeOut();
				
		if (MS.Loading.callbackFunction != null){
			MS.Loading.callbackFunction();
			MS.Loading.callbackFunction = null;
		}
	}

};
