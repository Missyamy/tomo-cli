import {
    fileContents,
    getDirectoryTree,
    readMakefileContent,
    run,
    useTemporaryDirectory
} from './tomo-test';
import {
    addDevTasks,
    createPackageJson,
    createSourceDirectory
} from '../src/commands/common';
import commands from '../src/commands';
import addBabel from '../src/commands/add-babel';
import addEsdoc from '../src/commands/add-esdoc';
import addEslint from '../src/commands/add-eslint';
import addJest from '../src/commands/add-jest';
import addMakefile from '../src/commands/add-makefile';
import {addPostcss, removePostcss} from '../src/commands/add-postcss';
// import addRust from '../src/commands/add-rust';
import addMarionette from '../src/commands/add-marionette';
import {addWebpack, removeWebpack} from '../src/commands/add-webpack';

jest.mock('is-online', () => (async () => true));

describe('"Create/New" commands', () => {
    let tempDirectory;
    const skipInstall = true;
    const {create} = commands;
    const [setTempDir, cleanupTempDir] = useTemporaryDirectory();
    beforeEach(async () => {
        tempDirectory = await setTempDir();
        process.chdir(tempDirectory);
    });
    afterEach(async () => {
        await cleanupTempDir();
    });
    test('create new project', async () => {
        const sourceDirectory = 'src';
        const options = {skipInstall, sourceDirectory};
        await run(create.project, options);
        const tree = getDirectoryTree(tempDirectory);
        expect(tree).toMatchSnapshot();
    });
    test('create new app', async () => {
        const sourceDirectory = 'src';
        const outputDirectory = './dist';
        const options = {outputDirectory, skipInstall, sourceDirectory};
        await run(create.app, options);
        const tree = getDirectoryTree(tempDirectory);
        expect(tree).toMatchSnapshot();
        const pkg = fileContents('package.json');
        expect(pkg).toMatchSnapshot();
    });
    test('create package.json', async () => {
        await run(createPackageJson, {});
        const contents = fileContents('./package.json');
        expect(contents).toMatchSnapshot();
    });
    test('create source directory', async () => {
        const sourceDirectory = 'some-random-folder-name';
        await run(createSourceDirectory, {sourceDirectory});
        const tree = getDirectoryTree(tempDirectory);
        expect(tree).toMatchSnapshot();
    });
});
describe('"Add" commands', () => {
    let tempDirectory;
    const skipInstall = true;
    const useReact = true;
    const {create} = commands;
    const [setTempDir, cleanupTempDir] = useTemporaryDirectory();
    beforeEach(async () => {
        tempDirectory = await setTempDir();
        process.chdir(tempDirectory);
    });
    afterEach(async () => {
        await cleanupTempDir();
    });
    test('add-babel', async () => {
        const sourceDirectory = 'src';
        const outputDirectory = './dist';
        const options = {outputDirectory, skipInstall, sourceDirectory};
        await run(addBabel, options);
        const tree = getDirectoryTree(tempDirectory);
        expect(tree).toMatchSnapshot();
        const contents = fileContents('./babel.config.js');
        expect(contents).toMatchSnapshot();
    });
    test('add-babel (with React)', async () => {
        const sourceDirectory = 'src';
        const outputDirectory = './dist';
        const options = {outputDirectory, skipInstall, sourceDirectory, useReact};
        await run(addBabel, options);
        const tree = getDirectoryTree(tempDirectory);
        expect(tree).toMatchSnapshot();
        const contents = fileContents('./babel.config.js');
        expect(contents).toMatchSnapshot();
    });
    test('add-esdoc', async () => {
        const sourceDirectory = 'src';
        const options = {skipInstall, sourceDirectory};
        await run(createPackageJson, {});
        const pre = fileContents('./package.json');
        expect(pre).toMatchSnapshot();
        await run(addEsdoc, options);
        const tree = getDirectoryTree(tempDirectory);
        expect(tree).toMatchSnapshot();
        const post = fileContents('./package.json');
        expect(post).toMatchSnapshot();
        const contents = fileContents('./esdoc.conf.json');
        expect(contents).toMatchSnapshot();
    });
    test('add-esdoc (with React)', async () => {
        const sourceDirectory = 'src';
        const options = {skipInstall, sourceDirectory, useReact};
        await run(addEsdoc, options);
        const tree = getDirectoryTree(tempDirectory);
        expect(tree).toMatchSnapshot();
        const contents = fileContents('./esdoc.conf.json');
        expect(contents).toMatchSnapshot();
    });
    test('add-eslint', async () => {
        const sourceDirectory = 'src';
        const options = {skipInstall, sourceDirectory};
        await run(addEslint, options);
        const tree = getDirectoryTree(tempDirectory);
        expect(tree).toMatchSnapshot();
        const contents = fileContents('./.eslintrc.js');
        expect(contents).toMatchSnapshot();
    });
    test('add-eslint (with React)', async () => {
        const sourceDirectory = 'src';
        const options = {skipInstall, sourceDirectory, useReact};
        await run(addEslint, options);
        const tree = getDirectoryTree(tempDirectory);
        expect(tree).toMatchSnapshot();
        const contents = fileContents('./.eslintrc.js');
        expect(contents).toMatchSnapshot();
    });
    test('add-jest', async () => {
        const options = {skipInstall};
        await run(createPackageJson, {});
        const pre = fileContents('./package.json');
        await run(addJest, options);
        const post = fileContents('./package.json');
        expect(pre).toMatchSnapshot();
        expect(post).toMatchSnapshot();
    });
    test('add-makefile', async () => {
        const sourceDirectory = 'src';
        const outputDirectory = './dist';
        const options = {outputDirectory, skipInstall, sourceDirectory};
        await run(addMakefile, options);
        expect(getDirectoryTree(tempDirectory)).toMatchSnapshot();
        const pre = readMakefileContent();
        await run(create.app, options);
        await run(addMakefile, options);
        expect(getDirectoryTree(tempDirectory)).toMatchSnapshot();
        const post = readMakefileContent();
        expect(pre).toMatchSnapshot();
        expect(post).toMatchSnapshot();
    });
    test('add-marionette', async () => {
        const sourceDirectory = 'src';
        const options = {skipInstall, sourceDirectory};
        await run(addMarionette, options);
        const tree = getDirectoryTree(tempDirectory);
        expect(tree).toMatchSnapshot();
    });
    test('add-postcss', async () => {
        const outputDirectory = './dist';
        const options = {outputDirectory, skipInstall};
        await run(createPackageJson, {});
        await run(addPostcss, options);
        const contents = fileContents('./postcss.config.js');
        expect(contents).toMatchSnapshot();
        const pkg = fileContents('./package.json');
        expect(pkg).toMatchSnapshot();
    });
    test('add-webpack', async () => {
        const sourceDirectory = 'src';
        const outputDirectory = './dist';
        const options = {outputDirectory, skipInstall, sourceDirectory};
        await run(createPackageJson, {});
        const pre = fileContents('./package.json');
        expect(pre).toMatchSnapshot();
        await run(addBabel, options);
        await run(addWebpack, options);
        const tree = getDirectoryTree(tempDirectory);
        expect(tree).toMatchSnapshot();
        const contents = fileContents('./webpack.config.js');
        expect(contents).toMatchSnapshot();
        const post = fileContents('./package.json');
        expect(post).toMatchSnapshot();
    });
});
describe('"Remove" commands', () => {
    let tempDirectory;
    const skipInstall = true;
    const [setTempDir, cleanupTempDir] = useTemporaryDirectory();
    beforeEach(async () => {
        tempDirectory = await setTempDir();
        process.chdir(tempDirectory);
    });
    afterEach(async () => {
        await cleanupTempDir();
    });
    test('remove postcss', async () => {
        const outputDirectory = './dist';
        const options = {outputDirectory, skipInstall};
        await run(createPackageJson, {});
        await run(addPostcss, options);
        const pre = fileContents('./package.json');
        const preTree = getDirectoryTree(tempDirectory);
        await run(removePostcss, {});
        const post = fileContents('./package.json');
        const postTree = getDirectoryTree(tempDirectory);
        expect(pre).toMatchSnapshot();
        expect(preTree).toMatchSnapshot();
        expect(post).toMatchSnapshot();
        expect(postTree).toMatchSnapshot();
    });
    test('remove webpack', async () => {
        const sourceDirectory = 'src';
        const outputDirectory = './dist';
        const options = {outputDirectory, skipInstall, sourceDirectory};
        await run(createPackageJson, {});
        await run(addWebpack, options);
        const preTree = getDirectoryTree(tempDirectory);
        const prePkg = fileContents('./package.json');
        expect(preTree).toMatchSnapshot();
        expect(prePkg).toMatchSnapshot();
        await run(removeWebpack, {});
        const postTree = getDirectoryTree(tempDirectory);
        const postPkg = fileContents('./package.json');
        expect(postTree).toMatchSnapshot();
        expect(postPkg).toMatchSnapshot();
    });
});
