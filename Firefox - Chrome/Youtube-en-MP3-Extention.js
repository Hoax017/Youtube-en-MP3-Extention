(function () {
	function getOption(){
		var video_id = window.location.search.split('v=')[1];
		if (video_id) {
			var ampersandPosition = video_id.indexOf('&');
			if(ampersandPosition != -1) video_id = video_id.substring(0, ampersandPosition);
		}

		AD_option = {
			page : window.location.pathname,
			videoId : video_id
		}
	}

	function App_v1(){
		$("div#watch-header div#watch7-user-header").before($AD_div)
	}

	function App_v2(){
		$('ytd-video-secondary-info-renderer div#container div#top-row').before($AD_div)
	}

	function dispatch(){
		getOption();
		$AD_iframe = $('<iframe>')
						.attr('src', '//www.recordmp3.co/#/watch?v='+AD_option.videoId+'&layout=button300100&append_file_name=-%20AymericDev.fr&t_press_to_start=T%C3%A9l%C3%A9charger&t_waiting_for_worker=Attente%20d\'un%20serveur&t_in_queue=Initialisation..&t_fetching_information=Recup%C3%A9ration%20des%20informations..&t_converting=Enregistrement%20..&t_done=T%C3%A9l%C3%A9charger')
						.css({
							position: 'absolute',
							height: '150px',
							border: '0px none',
							left: 'calc(50% - 150px)'
						});
		$AD_div = $('<div>')
						.css({
							position: 'relative',
							height: '46px',
							marginTop: '25px',
							overflow: 'hidden'
						})
						.append($AD_iframe);
		if (Version_YT == 1)
			App_v1();
		else if (Version_YT == 2)
			App_v2();
	}

	function init (){

		$( document ).ready(function() {

			console.log("Youtube en MP3 is Initialised")


			dispatch();
		});

	}

	function getVersion(){
		getOption();

		if (AD_option.page != "/watch")
			return;

		Version_loop++;
		console.log("Finding Version..", Version_loop);
		if ($("div#watch-header div#watch7-user-header").length)
			Version_YT = 1;
		else if ($('ytd-video-secondary-info-renderer div#container div#top-row').length)
			Version_YT = 2;
		if (Version_YT > 0) {
			console.log("Verison find !! ", Version_loop);
			main();
		} else if (Version_loop < 100) {
			setTimeout(function() {
				getVersion()
			}, 1000);
		} else {
			console.log("Verison not found, aborting.. ");
		}
	}

	function main() {
		init();

	}

	console.log("Youtube en MP3 is launch")

	var $AD_div;
	var $AD_iframe;
	var AD_option;
	var Version_YT = 0;
	var Version_loop = 0;

	$("body").on('click', 'a', function(event) {
		if ($AD_div) $AD_div.remove();
		setTimeout(function(){
			Version_YT = 0;
			Version_loop = 0;
			getVersion();
		}, 3000);
	});

	getVersion();
})()