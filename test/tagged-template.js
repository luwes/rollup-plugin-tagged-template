const assert = require('assert');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const taggedTemplate = require('..');

const browserEnv = require('browser-env');
browserEnv();

const rollupOptions = {
  input: 'test/fixtures/test.js',
  plugins: [
    resolve(),
    taggedTemplate()
  ]
};

const rolloutOptions = {
  name: 'blh',
  format: 'iife'
};

describe('rollup-plugin-tagged-template', () => {

  it('should return a template function for the HTML file', async () => {
    const rolledup = await rollup.rollup(rollupOptions);
    const { output } = await rolledup.generate(rolloutOptions);

    const runnable = new Function('assert', output[0].code);
    runnable(assert);
  });

  it('should properly bundle complicated nested templates', async () => {
    const rolledup = await rollup.rollup({
      ...rollupOptions,
      input: 'test/fixtures/nested.js'
    });
    const { output } = await rolledup.generate(rolloutOptions);

    const runnable = new Function('assert', output[0].code);
    runnable(assert);
  });

  it("should fail when the HTML import is excluded (because there's no loader for that file)", async () => {
    return assert.rejects(() =>
      rollup.rollup(
        Object.assign({}, rollupOptions, {
          input: 'test/fixtures/fail.js',
          plugins: [
            taggedTemplate({
              exclude: ['**/static.html']
            })
          ]
        })
      )
    );
  });
});
