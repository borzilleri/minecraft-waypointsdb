define(function(require) {
	var Marionette = require("backbone.marionette");
	var PointView = require('./PointItem');

	return Marionette.CollectionView.extend({
		itemView: PointView,
		className: 'accordion',
		id: 'point-list',
		collectionEvents: {
			'point:activate': 'onPointActivated'
		},
		appendHtml: function(collectionView, itemView, index) {
			collectionView.$el.prepend(itemView.el);
		},
		onPointActivated: function(cid) {
			this.children.each(function(view) {
				view.togglePoint(cid);
			});
		}
	});
});