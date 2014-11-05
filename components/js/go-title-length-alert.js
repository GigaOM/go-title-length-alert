(function( $ ) {
	'use strict';

	// add our title char count span
	$( '#titlewrap' ).append( '<span class="go-title-length-alert">Title length: <span class="go-title-length-alert-count"/></span>' );

	// jQuery select these elements once here
	var titleSpan = $( '#title' );
	var titleCountSpan = $( '.go-title-length-alert-count' )
	var titleLength = titleSpan.val().trim().length;

	// initialize the count
	titleCountSpan.text( titleLength.toString() );

	// the timer callback function to update the title length count
	var updateTitleCount = function() {
		// do we really need to update the count?
		var newTitleLength = titleSpan.val().trim().length;
		if ( newTitleLength === titleLength ) {
			setTimeout( updateTitleCount, 1500 ); // rinse and repeat
			return; // nope. bail.
		}

		// update the title length count
		titleLength = newTitleLength;
		titleCountSpan.text( titleLength.toString() );

		// do not continue if we don't have our threshold limits
		if ( undefined === go_title_length_alert || ! go_title_length_alert ){
			return;
		}

		// conditionally highlight the length count
		if ( titleLength >= go_title_length_alert.high_alert_threshold ) {
			titleCountSpan.removeClass( 'go-title-length-alert-alert' ).addClass( 'go-title-length-alert-high-alert' );
		}
		else if ( titleLength >= go_title_length_alert.alert_threshold ) {
			titleCountSpan.removeClass( 'go-title-length-alert-high-alert' ).addClass( 'go-title-length-alert-alert' );
		}
		else {
			titleCountSpan.removeClass( 'go-title-length-alert-alert go-title-length-alert-high-alert' );
		}

		setTimeout( updateTitleCount, 1500 ); // rinse and repeat
	}//END updateTitleCount

	// refresh our count every 1.5 seconds (but only if the count changed)
	setTimeout( updateTitleCount, 1500 );
})( jQuery );
