define([
	'jquery', 'underscore', 'backbone',
	'text!/template/main.html',
	'waypoints',
	'views/point',
],
function($, _, Backbone, Template, Collection, Point_View) {
	return Backbone.View.extend({
		template: Template,
		id: 'page-content',
		initialize: function() {
			_(this).bindAll();
			this.$el.html(this.template());
			this.collection = new Collection();
			this.collection
				.bind('add', this.addOne)
				.bind('reset', this.addAll)
				.bind('all', this.render)
				.fetch();
		},
		render: function() {
			return this;
		},
		addOne: function(model) {
			model.view = new Point_View({model:model});
			this.$('.point-list').append(model.view.render().el);
		},
		addAll: function() {
			this.collection.each(this.addOne);
		}
	});
});
