define(function(require) {
	if(!window.console) {
		(function() {
			var noop = function() {
				/* no-op for IE */
			};
			window.console = { log: noop, debug: noop, warn: noop, error: noop };
		})();
	}
});
