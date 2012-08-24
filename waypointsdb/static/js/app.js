define([
	'underscore', 'backbone',
	'views/main'
],
function(_, Backbone, Main_View) {
	return Backbone.Router.extend({
		routes: {
			'points/new': 'newPoint'
		},
		initialize: function() {
			_(this).bindAll();
			var view = new Main_View();
		},
		newPoint: function() {
			return false;
		}
	});
});
