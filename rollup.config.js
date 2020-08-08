/**
 * This generates es5 files for single entry-point TS files. It's used for the webworker files: core, core utils, plugins.
 *
 * TODO at the moment we're actually loading the utils code twice. There's no reason for this - the core script COULD load
 * this generated file & use the methods from the window object; as long as the typings were provided that'd cut down on
 * build size. But honestly it's <20KB and there are bigger fish to fry.
 */
import typescript from 'rollup-plugin-typescript2';
import removeExports from 'rollup-plugin-strip-exports';
import { terser } from 'rollup-plugin-terser';
import removeImports from './build/rollup-plugin-remove-imports';

// example usage: `npm rollup -c --config-src=src/utils/coreUtils.ts --config-target=dist/workers/coreUtils.js`
//
//    npx rollup -c --config-src=src/utils/workerUtils.ts --config-target=dist/debug.js
export default (cmdLineArgs) => {
	const { 'config-src': src, 'config-target': target } = cmdLineArgs;

	if (!src || !target) {
		console.error("\n*** Missing command line args. See file for usage. ***\n");
		return;
	}

	const terserCompressProps = {};

	// the whole point of the workerUtils file is to expose all utility methods in a single `utils` object
	// for use by plugin web workers. This is available on the global scope within a web worker
	if (src === 'src/utils/workerUtils.ts') {
		terserCompressProps.top_retain = ['utils'];
	} else {
		terserCompressProps.unused = false;
	}

	return {
		input: src,
		output: {
			file: target,
			format: 'es',
		},
		treeshake: false,
		plugins: [
			removeImports(),
			typescript({
				tsconfigOverride: {
					compilerOptions: {
						target: 'es5'
					}
				}
			}),
			terser({
				mangle: false,
				compress: {
					...terserCompressProps
				}
			}),
			removeExports()
		]
	}
};
