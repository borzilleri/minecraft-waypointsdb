define([
	'underscore', 'backbone'
],
function(_, Backbone) {
	return Backbone.Model.extend({
		defaults: {
			id: null,
			name: 'New Waypoint',
			color: '#ffffff',
			x: 0,
			y: 64,
			z: 0,
			download: true,
			poiType: 'none',
		},
		initialize: function() {
			_(this).bindAll();
		}
	});
});
