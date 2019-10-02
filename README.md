# rollup-plugin-tagged-template

Use plain HTML files as tagged templates.  

`npm install rollup-plugin-tagged-template`

## Usage

### rollup.config.js:

```js
import taggedTemplate from 'rollup-plugin-tagged-template';

export default {
  input: 'app.js',
  output: {
    file: 'bundle.js',
    format: 'esm'
  },
  plugins: [
    taggedTemplate({
      include: '**/*.html',     // required
      exclude: '**/*.js',       // optional
      tagName: 'html',          // optional - for nested tag templates
      propsName: 'props'        // optional
    })
  ]
};
```

### template.html

```html
<p>Hello ${name}</p>
```

### app.js

```js
// for example html from sinuous, can be any tag template function
import { html } from 'sinuous';
import template from './template.html';

const props = {
  name: 'Tiana'
};

console.log(template(html, props)); // outputs a Node: <p>Hello Tiana</p>
```
