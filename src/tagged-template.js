import { createFilter } from 'rollup-pluginutils';
import MagicString from 'magic-string';
import { getIdentifiers } from './utils.js';

export default function taggedTemplate(opts = {}) {
  opts = {
    ...opts,
    include: ['**/*.html'],
    tagName: 'html',
    propsName: 'props'
  };

  const filter = createFilter(opts.include, opts.exclude);

  return {
    name: 'rollup-plugin-tagged-template',
    transform(code, id) {
      if (!filter(id)) return;

      const newCode = template(code, opts);
      return {
        code: newCode.toString(),
        map: newCode.generateMap()
      };
    }
  };
}

function template(code, { tagName, propsName }) {
  const defs = getIdentifiers(code).map(exp => `${exp} = ${propsName}.${exp}`);
  const statement = defs.length ? `var ${defs.join(', ')};` : '';

  return new MagicString(`
export default function template(${tagName}, ${propsName}) {
  ${propsName} = ${propsName} || {};
  ${statement}
  return ${tagName}\`${code}\`;
}`);
}
