define([
	'underscore', 'backbone',
	'waypoint'
],
function(_, Backbone, Model) {
	return Backbone.Collection.extend({
		model: Model,
		url: window.SCRIPT_ROOT+'/api/points',
		initialize: function() {
			_(this).bindAll();
		}
	});
});
