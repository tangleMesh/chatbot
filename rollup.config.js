import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

export default {
    // If using any exports from a symlinked project, uncomment the following:
    // preserveSymlinks: true,
	input: 'src/index.js',
	output: [
		{
		  file: 'build/bundle.js',
		  format: 'cjs'
		},
		{
		  file: 'build/bundle.min.js',
		  format: 'iife',
		  name: 'version',
		  plugins: [terser()]
		}
	],
	plugins: [
        resolve()
    ]
};