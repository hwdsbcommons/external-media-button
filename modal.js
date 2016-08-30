var ray = ray || {};

/**
 * JS functionality to handle our custom "Add External Media" button.
 *
 * Slightly-altered JS from ocean90's Media Modal Demo plugin.
 *
 * @link https://github.com/ocean90/media-modal-demo
 */
( function( $ ) {
	var media;

	ray.media = media = {};

	_.extend( media, { view: {}, controller: {} } );

	media.buttonId = '#add-external-media',

	_.extend( media, {
		frame: function() {
			if ( this._frame ) {
				return this._frame;
			}

			this._frame = wp.media( {
				className: 'media-frame mode-select',
				frame: 'post',

				// Default tab to select when modal is loaded.
				// @todo This should probably be configurable...
				state: mexp && mexp.services && mexp.services.vimeo ? 'mexp-service-vimeo' : 'embed',

				// Disables plupload dropzone; plugins will be handling this by themselves.
				uploader: false
			} );

			this._frame.on( 'open', this.open );

			this._frame.on( 'ready', this.ready );

			this._frame.on( 'close', this.close );

			this._frame.on( 'menu:render:default', this.menuRender );

			return this._frame;
		},

		open: function() {
			$( '.media-modal' ).addClass( 'smaller' );
		},

		ready: function() {
			//console.log( 'Frame ready' );
		},

		close: function() {
			$( '.media-modal' ).removeClass( 'smaller' );
		},

		/**
		 * Get rid of some menu items we don't need.
		 *
		 * @todo Make this more intelligent instead of manually removing items.
		 */
		menuRender: function( view ) {
			// 'Insert from link'
			view.unset( 'embed' );

			// Playlists
			view.unset( 'playlist' );
			view.unset( 'video-playlist' );

			// Misc
			view.unset( 'insert' );
			view.unset( 'featured-image' );
			view.unset( 'library-separator' );
			view.unset( 'gallery' );

			// 3rd-party
			view.unset( 'mexp-service-twitter' );
			view.unset( 'mexp-service-youtube' );
			view.unset( 'mexp-service-instagram' );
		},

		init: function() {
			$( media.buttonId ).on( 'click', function( e ) {
				e.preventDefault();

				media.frame().open();
			});
		}
	} );

	$( media.init );
} )( jQuery );
