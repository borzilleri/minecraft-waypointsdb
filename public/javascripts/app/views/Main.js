define(function(require) {
	require('bootstrap/collapse');
	var Marionette = require('backbone.marionette');
	var ListView = require('./PointList');
	var Point = require('app/models/Point');

	return Marionette.Layout.extend({
		collection: null,
		template: '#main-template',
		regions: {
			points: '#list-view'
		},
		events: {
			'click .js-add-point': 'onAddPoint',
			'click .js-download': 'onDownloadPoints',
			'click .js-filter-points': 'onFilterPoints'
		},
		onRender: function() {
			this.points.show(new ListView({
				collection: this.collection
			}));
		},
		onAddPoint: function(e) {
			e.preventDefault();
			var newModel = this.collection.find(function(m) {
				return m.isNew();
			});
			if(!newModel) {
				newModel = new Point.Item();
				this.collection.add(new Point.Item());
			}
		},
		onFilterPoints: function(e) {
			e.preventDefault();
		},
		onDownloadPoints: function(e) {
			e.preventDefault();
		}
	});
});