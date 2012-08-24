requirejs.config({
	paths: {
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		knockout: 'lib/knockout',
		knockback: 'lib/knockback',
		text: 'lib/text',
		bootstrap: 'lib/bootstrap'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['jquery','underscore'],
			exports: 'Backbone'
		},
		'knockback': {
			deps: ['backbone', 'knockout'],
			exports: 'kb'
		}
	}
});

require([
		'jquery', 'underscore', 'backbone',	'app'
],
function($, _, Backbone, Router) {
	$(function() {
			new Router();
			Backbone.history.start();
	});
});
