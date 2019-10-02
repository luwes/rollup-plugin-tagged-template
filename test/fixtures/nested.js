import { html } from '../../node_modules/sinuous';
import template from './nested.html';

const node = template(html);

assert.equal(typeof template, 'function');
assert.ok(node instanceof Node);
assert.equal(node.childNodes.length, 11);
assert.equal(node.firstChild.data, 'This has ');
assert.equal(node.childNodes[1].data, 'A');
assert.equal(node.childNodes[2].data, 'B');
assert.equal(node.childNodes[3].data, 'C');
assert.equal(node.childNodes[4].data, ' nested template literals.');
assert.ok(node.childNodes[5] instanceof HTMLBRElement);
assert.ok(node.childNodes[6] instanceof HTMLBRElement);
assert.equal(node.childNodes[7].data, 'Like ');
assert.equal(node.childNodes[8].data, 'super-really');
assert.equal(node.childNodes[9].data, 'super-really');
