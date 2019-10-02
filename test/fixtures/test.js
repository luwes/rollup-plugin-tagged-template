import { html } from '../../node_modules/sinuous';
import template from './template.html';

const fill = 'test';
const node = template(html, { fill });

assert.equal(typeof template, 'function');
assert.ok(node instanceof Node);
assert.equal(node.childNodes[0].data, 'text content filled with ');
assert.equal(node.childNodes.length, 2);
assert.equal(node.childNodes[1].data, fill);
