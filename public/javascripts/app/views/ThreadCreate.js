define(function(require) {
	require('bootstrap/button');
	var Marionette = require('backbone.marionette');
	var marked = require('marked');
	var ace = require("ace/ace");
	require('bootstrap/tab');
	require('backbone.stickit');

	marked.setOptions({
		gfm: true,
		tables: false,
		breaks: true,
		sanitize: true,
		smartLists: true,
		smartypants: true
	});

	return Marionette.ItemView.extend({
		template: '#create-thread-template',
		tagName: 'form',
		className: 'well',
		id: 'create-thread-form',
		editor: null,
		ui: {
			editor: '#editor-pane',
			preview: '#preview-pane',
			save: '.post-submit',
			alert: '.alert'
		},
		events: {
			'shown .show-editor': 'onTabShow',
			'click .post-submit': 'onSave'
		},
		bindings: {
			'title': 'title',
			'closed': 'closed'
		},
		initialize: function() {
			_(this).bindAll('onEditorChange', 'onSaveSuccess', 'onSaveFail',
				'onSaveComplete');
			this.on('close', this.unstickit);
		},
		onRender: function() {
			this.editor = ace.edit(this.ui.editor.get(0));
			this.editor.setFontSize(16);
			this.editor.renderer.setShowGutter(false);
			this.editor.getSession().setMode("ace/mode/markdown");
			this.editor.getSession().setUseWrapMode(true);
			this.editor.getSession().setTabSize(2);
			this.editor.getSession().on('change', this.onEditorChange);

			this.editor.focus();
			this.stickit();
		},
		onEditorChange: function(event) {
			this.model.set('posts[0].contentSource', this.editor.getValue());
			this.ui.preview.html(marked(this.editor.getValue()));
		},
		onTabShow: function(event) {
			this.editor.focus();
		},
		onSave: function(event) {
			event.preventDefault();
			this.ui.alert.hide();
			this.ui.save.button('loading');
			this.ui.save.find('.post-submit-icon').addClass('icon-spin icon-refresh');
			// button loading
			this.model.save()
				.done(this.onSaveSuccess)
				.fail(this.onSaveFail)
				.always(this.onSaveComplete);
		},
		onSaveSuccess: function() {
			// We should redirect here.
		},
		onSaveFail: function() {
			this.ui.alert.text('Posting failed: ').show();
		},
		onSaveComplete: function() {
			this.ui.save.button("reset");
			this.ui.save.find('.post-submit-icon').removeClass('icon-spin icon-refresh');
		}
	});
});