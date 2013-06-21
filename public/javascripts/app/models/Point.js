define(function(require) {
	var Backbone = require('backbone');
	var routes = require('/routes.js');

	var Model = Backbone.Model.extend({
		defaults: {
			name: "New Waypoint",
			color: "#FFFFFF",
			x: 0,
			z: 0,
			y: 64,
			poiType: "outpost",
			dimension: [0]
		}
	});

	var Collection = Backbone.Collection.extend({
		url: function() {
			return routes.API.list().url
		},
		model: Model
	});

	return {
		Item: Model,
		Collection: Collection
	};
});