import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/Rotation.ts',
	output: [
		{
			format: 'umd',
			name: 'Stats',
			file: 'build/rotation.js',
			indent: '\t'
		},
		{
			format: 'es',
			name: 'Stats',
			file: 'build/rotation.module.js',
			indent: '\t'
		}
	],
	plugins: [typescript()]
};