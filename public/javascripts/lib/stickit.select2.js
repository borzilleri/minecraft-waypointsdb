define(function(require) {
	var Stickit = require('backbone.stickit');
	var $ = require('jquery');
	require('select2');

	Stickit.addHandler({
		selector: '.select2',
		initialize: function($el, model, opt) {
			var e = 'change:' + opt.observe,
				self = this;
			$el.select2(_.extend({}, opt.select2));
			var up = function(m, v, o) {
				if( !o.stickitChange ) $el.trigger('change');
			};
			this.listenTo(model, e, up);
			this.listenTo(model, 'stickit:unstuck', function() {
				self.stopListening(model, e, up);
			});
		}
	});

	if( !$('link[href*="select2.css"]', 'head').length ) {
		//Creates link element
		var css = document.createElement('link');
		css.setAttribute('rel', 'stylesheet');
		css.setAttribute('type', 'text/css');
		css.setAttribute('href', '/assets/stylesheets/select2.css');

		//Appends stylesheet
		document.getElementsByTagName('head')[0].appendChild(css);
	}
});

