/**
 * A simple plugin that makes file inputs look nicer and
 * more consistent across different browers and platforms.
 *
 * Works in all modern browsers and IE8+
 */
define(['jquery'], function(jQuery) {
	(function($) {
		var methods = {
			/**
			 * Initializes input field
			 */
			init: function() {
				this.each(function() {
					var container = $('<div/>', {'class': 'input-append faux-file'}),
						span = $('<span/>', {'class': 'input-xlarge uneditable-input'});
					btn = $('<button/>', {'class': 'btn browse-btn', text: 'Browse...'});

					container.append([span, btn]);
					$(this).before(container);
					$(this).prependTo(container);

					$(this).on('change.faux-file', methods.update);
				});

				return this;
			},

			/**
			 * Cross-browser function for clearing file inputs
			 */
			clear: function() {
				this.each(function() {
					var clone = $(this).clone(true);
					$(this).replaceWith(clone);
					clone.change();
				});
			},

			/**
			 * Updates label field with selected file name
			 */
			update: function() {
				var value = this.value.replace(/C:\\fakepath\\/, '');
				$(this).next('span').text(value);
			}
		};

		/**
		 * @function jQuery.fn.fileInput
		 * @plugin jquery/dom/within
		 *
		 * Makes file inputs look nicer (and more consistent in other browsers)
		 * by wrapping them in twitter bootstrap markup
		 *
		 *     // Usage
		 *     $('input[type=file]').fileInput();
		 */
		$.fn.fileInput = function(method) {
			if( methods[method] )
				return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			else if( typeof method === 'object' || !method )
				return methods.init.apply(this, arguments);
			else
				$.error('Method ' + method + ' not supported by jQuery.fileInput');
		}
	})(jQuery);
});

