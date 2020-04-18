var audio;

// hide pause button initially
$('#pause').hide();

// Initialise - play first song
initAudio($('#playlist li:first-child'));

// play song
function initAudio(element) {
	var song = element.attr('song');
	var title = element.text();
	var cover = element.attr('cover');

	// create a new audio object
	audio = new Audio('media/' + song);

	// insert song cover
	$('img.songcover').attr('src', 'images/covers/' + cover);

	// set song as active
	$('#playlist li').removeClass('active');
	element.addClass('active');

	// set audio-info
	$('#audioplayer .title').text(title);

	// initialise duration
	if (!audio.currentTime) {
		$('#duration').html('0.00');
	}
}

// duration
function showDuration() {
	$(audio).bind('timeupdate', function() {
		// get minutes and seconds
		var seconds = parseInt(audio.currentTime % 60);
		var minutes = parseInt((audio.currentTime / 60) % 60);

		// add 0 if seconds less than 10
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		$('#duration').html(minutes + '.' + seconds);
		var value = 0;
		if (audio.currentTime > 0) {
			value = Math.floor((60 / audio.duration) * audio.currentTime);
		}
		$('#progress').css('width', value + '%');
	});
}

// play song from playlist on click
$('#playlist li').click(function() {
	audio.pause();
	initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	audio.play();
	showDuration();
});


// prev
$('#prev').click(function() {
	audio.pause();
	var previous = $('#playlist li.active').prev();
	if (previous.length == 0) {
		previous = $('#playlist li:last-child');
	}
	initAudio(previous);
	audio.play();
	showDuration();
});

// play
$('#play').click(function() {
	audio.play();
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	showDuration();
});

// pause
$('#pause').click(function() {
	audio.pause();
	$('#play').show();
	$('#pause').hide();
});

// stop
$('#stop').click(function() {
	audio.pause();
	audio.currentTime = 0;
	$('#play').show();
	$('#pause').hide();
	$('#duration').fadeOut(400);
});

// next
$('#next').click(function() {
	audio.pause();
	var next = $('#playlist li.active').next();
	if (next.length == 0) {
		next = $('#playlist li:first-child');
	}
	initAudio(next);
	audio.play();
	showDuration();
});
