define(function(require) {
	var Marionette = require('backbone.marionette');
	var app = new Marionette.Application();
	var Point = require('./models/Point');
	var View = require('./views/Main');

	var collection = new Point.Collection();

	app.addRegions({
		main: '#main-view'
	});

	app.addInitializer(function() {
		collection.fetch().done(function() {
			app.main.show(new View({
				collection: collection
			}));
		})
	});

	app.start();
});