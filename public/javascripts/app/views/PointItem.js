define(function(require) {
	var Marionette = require('backbone.marionette');
	require('backbone.stickit');
	require('bootstrap/colorpicker');
	var AlertView = require('./Alert');

	return Marionette.Layout.extend({
		template: '#point-template',
		tagName: 'div',
		className: 'accordion-group',
		model: null,
		events: {
			'click .download': 'onToggleDownload',
			'click .save': 'onSave',
			'click .cancel': 'onCancel',
			'click .delete': 'onDelete',
			'colorChange .color-picker': 'onColorChange'
		},
		ui: {
			accordion: '.accordion-body',
			picker: '.color-picker',
			swatch: '.swatch',
			dlButton: '.download',
			dlIcon: '.download > i'
		},
		regions: {
			alert: '.alert-view'
		},
		bindings: {
			'.point-name': 'name',
			'.swatch': {
				attributes: [
					{
						name: "style",
						observe: "color",
						onGet: function(val) {
							return "background-color: " + val + ";";
						}
					}
				]
			},
			'.accordion-toggle': {
				attributes: [
					{
						name: 'href',
						observe: 'id',
						onGet: function(val) {
							return '#' + this.makeIdAttr(val);
						}
					}
				]
			},
			'.accordion-body': {
				attributes: [
					{
						name: 'id',
						observe: 'id',
						onGet: 'makeIdAttr'
					}
				]
			},
			'[name="color"]': 'color',
			'[name="name"]': 'name',
			'[name="x_coord"]': 'x',
			'[name="z_coord"]': 'z',
			'[name="y_coord"]': 'y',
			'[name="poiType"]': 'poiType',
			'[name="dimension"]': 'dimension'
		},
		initialize: function() {
			_(this).bindAll('makeIdAttr', 'onSaveSuccess', 'onError',
				'togglePoint', 'clearErrors', 'displayError');
			this.on('close', this.unstickit);
		},
		togglePoint: function(cid) {
			if( cid === this.model.cid ) {
				this.ui.accordion.collapse('show');
			}
			else if( this.ui.accordion.hasClass('in') ) {
				this.ui.accordion.collapse('hide');
			}
		},
		makeIdAttr: function(objId) {
			return 'point_' + objId;
		},
		onRender: function() {
			this.ui.picker.colorpicker({format: 'hex'});
			this.stickit();
		},
		onToggleDownload: function(e) {
			e.preventDefault();
			this.model.set('download', !this.model.get('download'));
			this.ui.dlButton.toggleClass('btn-success btn-danger');
			this.ui.dlIcon.toggleClass('icon-download icon-remove-circle');
		},
		onColorChange: function(e) {
			this.ui.swatch.backgroundColor(e.color.toHex());
		},
		onCancel: function(e) {
			e.preventDefault();
			this.clearErrors();
			this.model.fetch()
				.fail(this.onError)
				.always(this.togglePoint);
		},
		onDelete: function(e) {
			e.preventDefault();
			this.model.destroy();
			this.close();
		},
		onSave: function(e) {
			e.preventDefault();
			this.clearErrors();
			this.model.save()
				.done(this.onSaveSuccess)
				.fail(this.onError);
		},
		onSaveSuccess: function() {
			this.clearErrors();
			this.alert.show(new AlertView({
				message: "WayPoint saved successfully!",
				type: "success"
			}));
		},
		onError: function(jqXHR) {
			var error;
			try {
				error = JSON.parse(jqXHR.responseText);
			}
			catch( err ) {
				return;
			}
			if( !error ) {
				return;
			}
			_(error).each(this.displayError);
			this.alert.show(new AlertView({
				message: "Errors have occurred.",
				type: "error"
			}));
		},
		clearErrors: function() {
			this.$('.error').removeClass('error');
			this.$('.help-inline').text('');
			this.alert.close();
		},
		displayError: function(value, key) {
			if( _.isArray(value) ) {
				value = value.join(', ');
			}
			var $group = this.$('.group-' + key);
			$group.find('.help-inline').text(value);
			$group.addClass('error');
		}
	});
});