({
	baseUrl: "waypointsdb/static/js/",
	name: "main",
	out: "waypointsdb/static/js/app.js",
	inlineText: true,
	useStrict: true,
	//optimize: 'none',
	paths: {
		jquery: "lib/jquery",
		underscore: "lib/lodash",
		backbone: "lib/backbone",
		knockout: "lib/knockout",
		knockback: "lib/knockback-dev",
		text: "lib/text",
		bootstrap: "lib/bootstrap",
		template: "../../templates"
	},
	shim: {
		'backbone': {
			deps: ['jquery','underscore'],
			exports: 'Backbone'
		}
	}
})
