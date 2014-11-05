// create an instance of go_title_length_alert if we haven't already
if ( 'undefined' === typeof go_title_length_alert ) {
	var go_title_length_alert = {
		event: {}
	};
}

(function( $ ) {
	'use strict';

	//*--
	//* constructor
	//*	
	go_title_length_alert.init = function() {
		// add our title char count span
		$( '#titlewrap' ).append( '<span class="go-title-length-alert">Title length: <span class="go-title-length-alert-count"/></span>' );

		// jQuery select these elements once here
		this.$title_span = $( document.getElementById( 'title' ) );
		this.$title_count_span = $( '.go-title-length-alert-count' )

		// keep track of the current title length
		this.title_length = this.$title_span.val().length;

		// initialize the count
		this.$title_count_span.text( this.title_length.toString() );

		// set up a callback on keyup events to update the title length
		$( document ).on( 'keyup', '#title', function() {
			go_title_length_alert.update_title_count();
		});
	};

	//*--
	//* the callback function to update the title length count
	//*
	go_title_length_alert.update_title_count = function() {
		if ( ! this.$title_span.length ) {
			return;
		}

		// check if we really need to update the count
		var new_title_length = this.$title_span.val().length;

		if ( new_title_length === this.title_length ) {
			return; // nope. bail.
		}

		// update the title length count
		this.title_length = new_title_length;
		this.$title_count_span.text( this.title_length.toString() );

		// do not continue if we don't have our threshold limits
		if ( 'undefined' === typeof go_title_length_alert_config || ! go_title_length_alert_config ){
			return;
		}

		// conditionally highlight the length count
		if ( this.title_length >= go_title_length_alert_config.high_alert_threshold ) {
			this.$title_count_span.removeClass( 'go-title-length-alert-alert' ).addClass( 'go-title-length-alert-high-alert' );
		}
		else if ( this.title_length >= go_title_length_alert_config.alert_threshold ) {
			this.$title_count_span.removeClass( 'go-title-length-alert-high-alert' ).addClass( 'go-title-length-alert-alert' );
		}
		else {
			this.$title_count_span.removeClass( 'go-title-length-alert-alert go-title-length-alert-high-alert' );
		}
	}//END update_title_count

	$( function() {
		go_title_length_alert.init();
	});
})( jQuery );
