define([
	'underscore', 'backbone'
],
function(_, Backbone) {
	return Backbone.Model.extend({
		defaults: {
			id: null,
			name: 'New Waypoint',
			color: 'ffffff',
			x: 0,
			y: 0,
			z: 0
		},
		initialize: function() {
			_(this).bindAll();
		}
	});
});
