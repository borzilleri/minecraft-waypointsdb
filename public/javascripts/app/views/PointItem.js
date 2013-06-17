define(function(require) {
	var Marionette = require('backbone.marionette');
	require('backbone.stickit');

	return Marionette.ItemView.extend({
		template: '#point-template'
	});
});