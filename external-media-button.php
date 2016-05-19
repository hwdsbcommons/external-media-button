<?php
/*
 * Plugin Name: External Media Button
 * Description: Moves selected media menu items from the "Add Media" window into a new window titled "Add External Media".
 * Version: 0.1-alpha
 * Author: r-a-y
 * Author URI: https://profiles.wordpress.org/r-a-y
 */

defined( 'ABSPATH' ) or die();

/**
 * Instantiates the plugin during 'plugins_loaded' action.
 */
add_action( 'plugins_loaded', array( 'Ray_External_Media_Button', 'init' ) );

/**
 * Main plugin class.
 *
 * Props ocean90 for some JS hints:
 * @link https://github.com/ocean90/media-modal-demo
 */
class Ray_External_Media_Button {

	/**
	 * Static initializer.
	 */
	public static function init() {
		return new self;
	}

	/**
	 * Constructor.
	 */
	protected function __construct() {
		add_action( 'media_buttons',    array( $this, 'add_media_button' ) );
		add_action( 'wp_enqueue_media', array( $this, 'enqueue_assets' ) );
	}

	/**
	 * Output "Add External Media" button beside the existing "Add Media" button.
	 *
	 * @param string $editor_id ID for the textarea and TinyMCE and Quicktags instances (can contain only ASCII letters and numbers).
	 */
	public function add_media_button( $editor_id ) {
		print sprintf(
			'<button id="add-external-media" data-editor="content" class="button add_media" type="button"><span class="dashicons dashicons-admin-site"></span> %1$s</button>',
			__( 'Add External Media', 'external-media-button' )
		);
	}


	/**
	 * Enqueue assets.
	 */
	public function enqueue_assets() {
		$base = plugin_dir_url( __FILE__ );
		wp_enqueue_script( 'ray-media', $base . 'modal.js', array(
			'media-editor'
		) );

		wp_enqueue_style( 'ray-media', $base . 'modal.css' );
	}
}