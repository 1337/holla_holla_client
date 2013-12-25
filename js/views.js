define(function (require, exports, module) {
	var Marionette = require('backbone.marionette');
		
	exports.BaseView = Marionette.View.extend({
		serializeData: function () {
			return {};
		},
		render: function () {
			this.$el.html(this.template.render(this.serializeData()));
		}
	});

	exports['Home'] = exports.BaseView.extend(require('views/home'));
	exports['Test'] = exports.BaseView.extend(require('views/test'));
	exports['NotFound'] = exports.BaseView.extend(require('views/404'));

	return exports;
});
