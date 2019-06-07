"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.array.iterator"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.removeBrowsersync=exports.addBrowsersync=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_utils=require("../utils"),_common=require("../utils/common");const BROWSERSYNC_DEPENDENCIES=["browser-sync","npm-run-all"],addBrowsersync=[{text:"Add Browsersync tasks to package.json",task:function(){var a=(0,_asyncToGenerator2.default)(function*({outputDirectory:a}){yield new _utils.PackageJsonEditor().extend({scripts:{prestart:"npm run build",start:"npm-run-all --parallel build:watch build:css:watch serve",serve:`browser-sync start --server ${a} --files ${a}`}}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:({useParcel:a})=>(0,_common.allDoExist)("package.json","postcss.config.js")&&((0,_common.someDoExistSync)("webpack.config.js","rollup.config.js")||a)// eslint-disable-line max-len
},{text:"Install Browsersync dependencies",task:({skipInstall:a})=>(0,_utils.install)(BROWSERSYNC_DEPENDENCIES,{dev:!0,skipInstall:a}),condition:({isNotOffline:a})=>a&&(0,_common.someDoExist)("package.json")}];/**
 * @type {task[]}
 * @see https://www.browsersync.io/docs/command-line
 */exports.addBrowsersync=addBrowsersync;const removeBrowsersync=[{text:"Remove Browsersync tasks from package.json",task:function(){var a=(0,_asyncToGenerator2.default)(function*(){yield new _utils.PackageJsonEditor().extend({scripts:{prestart:void 0,start:void 0,serve:void 0}}).commit()});return function task(){return a.apply(this,arguments)}}(),condition:()=>(0,_common.allDoExist)("package.json")},{text:"Uninstall Browsersync dependencies",task:()=>(0,_utils.uninstall)(BROWSERSYNC_DEPENDENCIES),condition:({skipInstall:a})=>!a&&(0,_common.someDoExist)("package.json")&&new _utils.PackageJsonEditor().hasAll(...BROWSERSYNC_DEPENDENCIES),optional:({skipInstall:a})=>!a}];exports.removeBrowsersync=removeBrowsersync;var _default=addBrowsersync;exports.default=_default;