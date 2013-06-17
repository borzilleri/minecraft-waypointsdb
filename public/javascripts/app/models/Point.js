define(function(require) {
	var Backbone = require('backbone');
	var routes = require('/routes.js');

	var model = Backbone.Model.extend({
		defaults: {
			name: "",
			color: "#FFFFFF",
			x: 0,
			z: 0,
			y: 64,
			poiType: "", // poi, rail-station, base, ??
			dimension: 0
		}
	});

	var collection = Backbone.Collection.extend({
		url: function() {
			return routes.list().url
		},
		model: model
	});

	return {
		Item: model,
		Collection: collection
	};
});