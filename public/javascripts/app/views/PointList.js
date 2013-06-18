define(function(require) {
	var Marionette = require("backbone.marionette");
	var PointView = require('./PointItem');

	return Marionette.CollectionView.extend({
		itemView: PointView,
		className: 'accordion',
		id: 'point-list',
		appendHtml: function(collectionView, itemView, index) {
			collectionView.$el.prepend(itemView.el);
		}
	});
});