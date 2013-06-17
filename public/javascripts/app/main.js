define(function(require) {
	var Marionette = require('backbone.marionette');
	var app = new Marionette.Application();
	var Point = require('./models/Point');
	var View = require('./views/PointList');

	var collection = new Point.Collection();

	app.addRegions({
		points: '#point-list'
	});

	app.addInitializer(function() {
		collection.fetch().done(function() {
			app.threads.show(new View(collection));
		})
	});

	app.start();
});