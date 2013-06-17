define(function(require) {
	var Backbone = require('backbone');
	var Marionette = require('backbone.marionette');
	require('backbone.stickit');

	return Backbone.Marionette.ItemView.extend({
		template: '#thread-item-template'
	});

});