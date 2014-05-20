define(function (require, exports, module) {
	var views = require('views'),
		app = require('app'),
		routes = [];

	routes.push(require('routes/home'));
	routes.push(require('routes/test'));
	routes.push(require('routes/404'));
	routes.push(require('routes/var'));

	exports.router = new Backbone.Router();

	routes.forEach(function (route) {
		if (!route.argument_names) {
			route.argument_names = [];
		}

		if (!route.external_dependencies) {
			route.external_dependencies = [];
		}

		exports.router.route(route.path, route.name, function () {
			var data = {},
				args = Array.prototype.slice.call(arguments),
				view;

			if (args.length !== route.argument_names.length) {
				throw new Error('Expected ' + route.argument_names.length + ' arguments but got ' + args.length);
			}

			args.forEach(function (argument, index) {
				data[route.argument_names[index]] = argument;
			});

			route.external_dependencies.forEach(function (path) {
				$.ajax({
					url: 'http://localhost:3000/' + path,
					success: function (response) {
						data[path] = response;
					},
					async: false
				});
			});

			view = new views[route.view](data);

			app.content.show(view);
		});
	});
});
