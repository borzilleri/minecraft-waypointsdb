define(function(require) {
	var Marionette = require("backbone.marionette");
	require("backbone.stickit");
	var PointView = require('./PointItem');

	return Marionette.CollectionView.extend({
		itemViewContainer: 'ul',
		itemView: PointView,
		events: {
		},
		ui: {
		},
		bindings: {
		},
		initialize: function() {
			this.on('close', this.unstickit);
		},
		onRender: function() {
			this.stickit();
		}
	});
});