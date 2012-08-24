define([
	'jquery', 'underscore', 'backbone',
	'knockout', 'knockback',
	'text!template/point.html',
	'bootstrap/collapse',
	'bootstrap/colorpicker'
],
function($, _, Backbone, ko, kb, Template) {
	// "max" or value from -1 to -7
	var mapZoom = -2;
	var y = 64;

	var PointViewModel = kb.ViewModel.extend({
		constructor: function(model) {
			var self = this;
			kb.ViewModel.prototype.constructor.apply(this, arguments);
			this.divId = ko.computed(function(){ return "point-"+this.id();},this);
			this.divIdHash = ko.computed(function(){ return "#"+this.divId();},this);
			this.mapUrl = ko.computed(function(){
				return "http://rampant.io/minecraft/map/#/"+
					this.x()+"/"+y+"/"+this.z()+
					"/"+mapZoom+"/0/0";
			},this);
			this.hasChanged = ko.computed(function() {
				return model.hasChanged();
			},this);

		}
	});

	return Backbone.View.extend({
		className: 'accordion-group',
		template: Template,
		events: {
			'submit form': 'onSubmit',
			'click .cancel': 'onCancel',
			'click .delete': 'onDelete',
			'click .download': 'onDownloadSelect'
		},
		initialize: function() {
			var self = this;
			_(this).bindAll();
			this.viewModel = new PointViewModel(this.model);
			this.model.bind('destroy', this.remove);
		},
		render: function() {
			this.$el.html(this.template);
			ko.applyBindings(this.viewModel, this.el);
			this.$('.color').colorpicker({
				attachTo: this.$el
			});
			return this;
		},
		collapse: function() {
			this.$('.accordion-body').collapse('hide');
		},
		onSubmit: function(e) {
			var self = this;
			e.preventDefault();
			this.model.save(null,{
				success: this.collapse
			});
			return false;
		},
		onCancel: function(e) {
			var self = this;
			e.preventDefault();
			this.model.fetch({
				success: this.collapse
			});
			return false;
		},
		onDelete: function(e) {
			e.preventDefault();
			if( confirm('Delete Waypoint "'+this.model.get('name')+'"?') ) {
				this.model.destroy();
			}
			return false;
		},
		onDownloadSelect: function() {
			this.model.set({download:!this.model.get('download')});
			return false;
		}
	});
});
