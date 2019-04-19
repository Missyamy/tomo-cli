"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.tasks = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../utils");

const WEBPACK_DEPENDENCIES = ['webpack', 'webpack-cli', 'webpack-dashboard', 'webpack-jarvis', 'webpack-dev-server'];
const cfg = new _utils.WebpackConfigEditor();
/** @ignore */

const tasks = [{
  text: 'Create Webpack configuration file',
  task: function () {
    var _ref = (0, _asyncToGenerator2.default)(function* ({
      sourceDirectory
    }) {
      const entry = {
        app: `${sourceDirectory}/main.js`
      };
      yield cfg.create().done();
      yield cfg.prepend(`const DashboardPlugin = require('webpack-dashboard/plugin');`).done();
      yield cfg.prepend(`const {resolve} = require('path');`).done();
      yield cfg.extend({
        entry
      }).done();
    });

    return function task(_x) {
      return _ref.apply(this, arguments);
    };
  }(),
  condition: () => (0, _utils.allDoNotExist)('webpack.config.js')
}, {
  text: 'Install Webpack dependencies',
  task: ({
    skipInstall
  }) => (0, _utils.install)(WEBPACK_DEPENDENCIES, {
    dev: true,
    skipInstall
  }),
  condition: () => (0, _utils.someDoExist)('package.json')
}];
exports.tasks = tasks;
var _default = tasks;
exports.default = _default;