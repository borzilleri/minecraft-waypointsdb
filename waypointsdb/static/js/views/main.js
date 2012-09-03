define([
	'jquery', 'underscore', 'backbone',
	'waypoints',
	'views/point',
	'bootstrap/modal'
],
function($, _, Backbone, Collection, Point_View) {
	return Backbone.View.extend({
		el: $('body'),
		events: {
			'click .add': 'onAddPoint',
			'click .download-points': 'onDownload',
			'click .help': 'onHelp'
		},
		initialize: function() {
			_(this).bindAll();
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
		onAddPoint: function(e) {
			this.collection.add({});
			return false;
		},
		addOne: function(model) {
			model.view = new Point_View({model:model});
			var point = model.view.render().el,
					$list = this.$('#point-list');
			if( !model.id ) {
				$list.prepend(point);
				$list.find('.accordion-body.in').collapse('hide');
				$list.find(':first-child .accordion-body').collapse('show');
			}
			else {
				$list.append(point);
			}
		},
		addAll: function() {
			this.collection.each(this.addOne);
		},
		onDownload: function() {
			var ids = _(this.collection.filter(function(model) {
				return model.get('download');
			})).pluck('id');

			$.ajax({
					url: window.URL_ROOT+'/download',
					contentType: 'application/json',
					data: JSON.stringify(ids),
					type: 'POST'
			})
			.done(function(path) {
				window.location.pathname += 'download'+path;
			});

			return false;
		},
		onHelp: function() {
			return false;
		}
	});
});
