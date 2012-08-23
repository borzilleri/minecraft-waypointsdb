define([
	'underscore', 'backbone',
	'waypoint'
],
function(_, Backbone, Model) {
	return Backbone.Collection.extend({
		model: Model,
		url: '/api/points',
		initialize: function() {
			_(this).bindAll();
		}
	});
});
