import {
    allDoNotExist,
    someDoExist,
    install,
    WebpackConfigEditor
} from '../utils';

const WEBPACK_DEPENDENCIES = [
    'webpack',
    'webpack-cli',
    'webpack-dashboard',
    'webpack-jarvis',
    'webpack-dev-server'
];
const cfg = new WebpackConfigEditor();
/** @ignore */
export const tasks = [
    {
        text: 'Create Webpack configuration file',
        task: async ({sourceDirectory}) => {
            const entry = {
                app: `${sourceDirectory}/main.js`
            };
            await cfg.create().done();
            await cfg.prepend(`const DashboardPlugin = require('webpack-dashboard/plugin');`).done();
            await cfg.prepend(`const {resolve} = require('path');`).done();
            await cfg.extend({entry}).done();
        },
        condition: () => allDoNotExist('webpack.config.js')
    },
    {
        text: 'Install Webpack dependencies',
        task: ({skipInstall}) => install(WEBPACK_DEPENDENCIES, {dev: true, skipInstall}),
        condition: () => someDoExist('package.json')
    }
];
export default tasks;