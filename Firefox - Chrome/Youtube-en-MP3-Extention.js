(function () {

	function getOption(){
		var video_id = window.location.search.split('v=')[1];
		var ampersandPosition = video_id.indexOf('&');
		if(ampersandPosition != -1) video_id = video_id.substring(0, ampersandPosition);

		AD_option = {
			page : window.location.pathname,
			videoId : video_id
		}
	}
	function App_v1(){
		if ($("div#watch-header div#watch7-user-header"))
			$("div#watch-header div#watch7-user-header").before($AD_div)
	}
	function App_v2(){
		var tested = $('ytd-video-secondary-info-renderer div#container div#top-row');
		console.log('Try to find reference element');
		if (tested.length)
		{
			getOption();
			console.log('Found !');
			tested.before($AD_div)
		}
		else
			setTimeout(App_v2, 500);
		console.log("toto");
	}

	function dispatch(){
		getOption();
		if ($AD_div) $AD_div.remove();
		$AD_div = $('<div>')
						.css({
							position: 'relative',
							height: '46px',
							marginTop: '25px',
							overflow: 'hidden'
						})
						.append(
							$('<iframe>')
								.attr('src', '//www.recordmp3.co/#/watch?v='+AD_option.videoId+'&layout=button300100&append_file_name=-%20AymericDev.fr&t_press_to_start=T%C3%A9l%C3%A9charger&t_waiting_for_worker=Attente%20d\'un%20serveur&t_in_queue=Initialisation..&t_fetching_information=Recup%C3%A9ration%20des%20informations..&t_converting=Enregistrement%20..&t_done=T%C3%A9l%C3%A9charger')
								.css({
									position: 'absolute',
									height: '150px',
									border: '0px none',
									left: 'calc(50% - 150px)'
								})
						)
		$( document ).ready(function() {
			if (Version_YT == 1)
				App_v1();
			else
				App_v2();
		});
	}
	var Version_YT = 2;
	if ($("div#watch-header div#watch7-user-header").length)
		Version_YT = 1;

	var $AD_div;
	var AD_option;

	getOption();

	if (AD_option.page != "/watch")
		return;


	dispatch();
	$("a").click(function(event) {
		dispatch();
	});
})()