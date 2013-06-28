require.config({
	baseUrl: window.wpdb.context+'/assets/javascripts/vendor',
	paths: {
		underscore: 'lodash',
		app: '../app',
		lib: '../lib'
	}
});

require(['jquery', 'lib/console'], function($) {
	window.wpdb = window.wpdb || {};
	$(function() {
		require(["app/main"]);
	});
});
