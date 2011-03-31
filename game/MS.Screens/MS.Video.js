MS.Video = {
	
	
	videoCount: 0,						/** Dynamically changes to count the number of videos in project **/
	activeVideo: null,					/** Keeps track of current video **/
	callbackFunction: null, 			/** Keep track of what to do after current video is done **/
	keyEventListener_enabled: false,	/** Keep track of key event listener **/
	
	/* VIDEO NAMES */
	HELP: null,	
	
	/** Use to define videos to preload. Match following format:
	 *  	VIDEO_NAME : MS.Video.createVideoElement("file1_path", "file2_path", ...)
	 */	
	preloadVideos : function() {
		MS.Video.HELP = MS.Video.createVideoElement("resources/videos/sample.theora.ogv");	
	},
		
	/** Shows specified video on screen. The #videoPlayer DIV is displayed, and the selected video is un-hidden.
	 *  Video starts playing and when done , hideVideo() is called. 
	 *  videoKeyEventListener is also enabled.
	 *  
	 * @param video, jQuery Video element object. Use set of preloaded videos. Example: MS.Video.videos.INTRO
	 * @param callback, a callback function to execute when video is done.  
	 */
	showVideo : function(video, callback){				
		/** show video player tag **/
		var videoPlayer = $("#videoPlayer");
		videoPlayer.css("display", "inline");
		
		/** hide last video if one was there, and show current video **/
		if (MS.Video.activeVideo != null){
			MS.Video.activeVideo.css("display", "none");
		}
		MS.Video.activeVideo = video;
		MS.Video.activeVideo.css("display", "inline");
		
		/** Start Video **/
		video.get(0).play();
		
		MS.Video.callbackFunction = callback;
		/** Make sure we hide things when video ends **/
		video.get(0).addEventListener('ended', function () {
			MS.Video.hideVideo(callback);			
		} );
		
		/** only start key listener if not started already */
		if (!MS.Video.keyEventListener_enabled) {
			DE.InputManager.Keyboard.subscribe(MS.Video.videoKeyEventListener);
			MS.Video.keyEventListener_enabled = true;
		}
	},



	/** Pauses playback in video if it is playing, hides the video, clears the timer and hides the video player.
	 *  Also un-subscribes from the video key listener.
	 */
	hideVideo : function(callback){
				
		MS.Video.activeVideo.get(0).pause();
		MS.Video.activeVideo.get(0).currentTime = 0;		
		MS.Video.activeVideo.css("display", "none");
		MS.Video.activeVideo = null;
		MS.Video.callbackFunction = null;
		
		$("#videoPlayer").css("display", "none");

		if (callback != undefined && callback != null){
			callback();
		}
		
		if (MS.Video.keyEventListener_enabled) {
			DE.InputManager.Keyboard.unsubscribe(MS.Video.videoKeyEventListener);
			MS.Video.keyEventListener_enabled = false;
		}
	},
	
	skipVideo : function(){
		MS.Video.hideVideo(MS.Video.callbackFunction);
	},
	
	
	
	/** Creates a DOM Video tag with id, width and height attributes set.
	 *  It then creates a Source tag within the Video tag for each source file passed in as the argument.
	 *  Source tag detects type attribute based on filename, populates the src attribute and the id attribute.
	 *  Video is appended to the #videoPlayer DOM element
	 *  
	 * @param string src, multiple arguments each giving the path of different files for the same video.
	 * @return jQuery object referring to the Video DOM element created.
	 */
	createVideoElement : function(src){

		MS.Video.videoCount++;
		
		var video = $(document.createElement("Video"));
		video.attr('id', 'video' + MS.Video.videoCount);
/*
		video.attr('width', MS.Config.Resolution.WIDTH);
		video.attr('height', MS.Config.Resolution.HEIGHT);
*/
		video.css('display','none');
							
 		var arguments = MS.Video.createVideoElement.arguments;
		
		for (var i = 0; i < arguments.length; i++)
        {
			
			var type;
			var ext = arguments[i].substring(arguments[i].lastIndexOf(".")+1).toLowerCase();
	
			switch (ext){
				case "ogg", "ogv":
					type = "video/ogg";
					break;
					
				case "mp4", "avi":
					type = "video/mp4";
					break;
					
				case "webm":
					type = "video/webm";
					break;
					
				default:
					break;					
			}
			
			var source = $(document.createElement("Source"));
			source.attr('id', 'video' + MS.Video.videoCount + '_' + i);
			source.attr('src', arguments[i]);
			source.attr('type', type);			
			video.append(source);            
        }
		
		/** Load contest of video right away
		 *  https://developer.mozilla.org/En/XPCOM_Interface_Reference/NsIDOMHTMLMediaElement#load()
		 */
		video.get(0).load();
		
		$("#videoPlayer").append(video);		
		return video;
	},
	
	
	/** Input Listener which subscribes to keyboard events and dispatches appropriate events
	 *  
	 *  @param event, keyDown event called by keyboard listener. 
	 */			
	videoKeyEventListener: function (event){
		if (event.which == '13' || event.which == '32') {		// Enter or Space
			MS.Video.skipVideo();
			event.preventDefault();
		}
	}	
};
