<?php
/**
 * Add a client-side title counter functionality.
 */
class GO_TitleLengthAlert
{
	public $version = '1.0';

	private $config = NULL;

	/**
	 * Initialize the plugin and register all the hooks.
	 */
	public function __construct()
	{
		// Register hooks. this is only used in admin dashboard
		if ( ! is_admin() )
		{
			return;
		}

		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
	}//END __construct

	/**
	 * Implements the admin_enqueue_scripts action in to add CSS and JS.
	 */
	public function admin_enqueue_scripts( $hook_suffix )
	{
		if ( 'post.php' != $hook_suffix )
		{
			return; // not on post edit admin page
		}

		$post = get_post();

		if ( ! is_object( $post ) )
		{
			return; // there's no post on page. bail.
		}

		wp_register_style( 'go-title-length-alert', plugins_url( 'css/go-title-length-alert.css', __FILE__ ), FALSE, $this->version );
		wp_enqueue_style( 'go-title-length-alert' );

		wp_register_script(
			'go-title-length-alert',
			plugins_url( 'js/go-title-length-alert.js', __FILE__ ),
			array( 'jquery' ),
			$this->version,
			TRUE
		);
		wp_enqueue_script( 'go-title-length-alert' );

		// pass our configuration to our js
		wp_localize_script(
			'go-title-length-alert',
			'go_title_length_alert_config',
			array(
				'alert_threshold' => $this->config( 'alert_threshold' ),
				'high_alert_threshold' => $this->config( 'high_alert_threshold' ),
			)
		);
	}//END admin_enqueue_scripts

	/**
	 * returns our current configuration, or a value in the configuration.
	 *
	 * @param string $key (optional) key to a configuration value
	 * @return mixed Returns the config array, or a config value if
	 *  $key is not NULL, or NULL if $key is specified but isn't set in
	 *  our config file.
	 */
	public function config( $key = NULL )
	{
		if ( empty( $this->config ) )
		{
			$this->config = apply_filters(
				'go_config',
				array(),
				'go-title-length-alert'
			);

			if ( empty( $this->config ) )
			{
				do_action( 'go_slog', 'go-title-length-alert', 'Unable to load go-title-length-alert\' config file' );
				return NULL;
			}
		}//END if

		if ( ! empty( $key ) )
		{
			return isset( $this->config[ $key ] ) ? $this->config[ $key ] : NULL ;
		}

		return $this->config;
	}//END config
}//END class
