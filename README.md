go-title-length-alert
=====================

Gigaom Post Title Length Alert System

This plugin watches the length of the post title and warns the user via
the title length message under the title text field when the text exceeds
some predefined length. We have two thresholds: alert_threshold and
high_alert_threshold, each of which can be configured to change the title
length count to a different color to warn the writer.

Hacking notes
=============
The alert and high alert threshold settings are obtained by calling the
[go_config](https://github.com/GigaOM/go-title-length-alert/blob/26869c97543c0567a458168ab263bce730ea464d/components/class-go-title-length-alert.php#L77)
filter, with our plugin slug `go-title-length-alert`. To set these
configurations, just add a filter like this:
````
add_filter( 'go_config', function( $config, $which ) {
	if ( 'go-title-length-alert' == $which )
	{
		$config['alert_threshold'] = 55;
		$config['high_alert_threshold'] = 66;
	}

	return $config;
}, 11, 2 );
````

The "alert_threshold" configuration is the character length when the title
span will be set to the [go-title-length-alert-alert class](https://github.com/GigaOM/go-title-length-alert/blob/79d2f7f675b802d00256c84269685a1d4e00fb3f/components/css/go-title-length-alert.css#L10),
and the "high_alert_threshold" configuration is the character length when
the title span will be set to the [go-title-length-alert-high-alert class]
(https://github.com/GigaOM/go-title-length-alert/blob/79d2f7f675b802d00256c84269685a1d4e00fb3f/components/css/go-title-length-alert.css#L14).

These two classes are styled in [the css](https://github.com/GigaOM/go-title-length-alert/blob/79d2f7f675b802d00256c84269685a1d4e00fb3f/components/css/go-title-length-alert.css#L14) to control what color to turn the title length
count to when the length thresholds are exceeded.

Struggles & annoyances
======================
