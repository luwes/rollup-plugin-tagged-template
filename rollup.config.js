var pkg = require('./package.json');
var externals = Object.keys(pkg.dependencies).concat(['path']);

export default {
  input: 'src/tagged-template.js',
  watch: {
    clearScreen: false
  },
  treeshake: {
    pureExternalModules: true,
    propertyReadSideEffects: false
  },
  external: externals,
  output: [
    {
      format: 'cjs',
      file: pkg['main']
    },
    {
      format: 'esm',
      file: pkg['module']
    }
  ]
};
