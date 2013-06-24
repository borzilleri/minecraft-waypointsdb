define(function(require) {
	var Backbone = require('backbone');
	var Marionette = require('backbone.marionette');
	require('bootstrap/alert');

	return Marionette.ItemView.extend({
		template: function(data) {
			return _.template('<div class="alert fade alert-<%= args.type %>"><%= args.msg %></div>',
				{
					msg: data.message,
					type: data.type
				}, {variable: 'args'});
		},
		ui: {
			alert: '.alert'
		},
		initialize: function() {
			this.model = new Backbone.Model({
				message: this.options.message,
				type: this.options.type
			});
		},
		onRender: function() {
			this.ui.alert.alert();
			this.ui.alert.addClass('in');
		},
		onBeforeClose: function() {
			this.ui.alert.alert('close');
		}
	});

});