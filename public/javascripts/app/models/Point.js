define(function(require) {
	var Backbone = require('backbone');
	var routes = require('routes');

	var Model = Backbone.Model.extend({
		defaults: {
			name: "New Waypoint",
			color: "#FFFFFF",
			x: 0,
			z: 0,
			y: 64,
			poiType: "outpost",
			dimension: [0],
			// These properties are used strictly at the JS layer.
			download: true
		}
	});

	var Collection = Backbone.Collection.extend({
		url: routes.API.list().url,
		model: Model
	});

	return {
		Item: Model,
		Collection: Collection
	};
});