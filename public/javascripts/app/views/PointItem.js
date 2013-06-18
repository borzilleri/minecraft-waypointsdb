define(function(require) {
	var Marionette = require('backbone.marionette');
	require('backbone.stickit');

	return Marionette.ItemView.extend({
		template: '#point-template',
		tagName: 'div',
		className: 'accordion-group',
		events: {
			'click .download': 'onToggleDownload'
		},
		bindings: {
			'.point-name': 'name',
			'.swatch': {
				attributes: [
					{
						name: "style",
						observe: "color",
						onGet: function(val) {
							return "background-color: #" + val + ";";
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
							return '#'+this.makeIdAttr(val);
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
			'[name="y_coord"]': 'y'
		},
		initialize: function() {
			_(this).bindAll('makeIdAttr');
			this.on('close', this.unstickit);
		},
		makeIdAttr: function(objId) {
			return 'point_'+objId;
		},
		onRender: function() {
			this.stickit();
		},
		onToggleDownload: function(e) {
			e.preventDefault();
			$(e.target).toggleClass('btn-success btn-danger');
		}
	});
});