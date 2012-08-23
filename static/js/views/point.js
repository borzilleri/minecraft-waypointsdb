define([
	'jquery', 'underscore', 'backbone',
	'knockout', 'knockback',
	'text!/template/point.html',
	'bootstrap/collapse'
],
function($, _, Backbone, ko, kb, Template) {
	var pointViewModel = kb.ViewModel.extend({
		constructor: function(model) {
			kb.ViewModel.prototype.constructor.apply(this, arguments);
			this.divId = ko.computed(function(){ return "point-"+this.id(); },this);
		}
	});

	return Backbone.View.extend({
		template: Template,
		events: {
		},
		initialize: function() {
			_(this).bindAll();
			this.viewModel = pointViewModel(this.model);
			this.model.bind('destroy', this.remove);
		},
		render: function() {
			this.$el.html(this.template());
			ko.applyBindings(this.viewModel, this.el);
			return this;
		}
	});
});
