# PostCSS - Polymer Loader

> PostCSS Webpack loader for Polymer elements. Works in combination with the awesome [wc-loader](https://github.com/aruntk/wc-loader).

# Install

    yarn add --dev postcss-polymer-loader

# Setup configurations

Add the `postcss` configuration file:

#### postcss.config.js

> NOTE: you need to add these (or other) plugins as project dependencies.

```js
module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {},
    'autoprefixer': {},
    'cssnano': {}
  }
}
```

Add the loader to your `webpack` config:

#### webpack.config.js

```js

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['wc-loader', 'postcss-polymer-loader']
      }
    ]
  }
}

```


# Setup project

As stated, this loader needs an HTML loader and precisely the [wc-laoder](https://github.com/aruntk/wc-loader) to load Web Components. More specifically we are talking about Polymer elements.
> NOTE: since the `wc-loader` works well with the Polymer 2.x version, the example will be written in Polymer 2 sintax, but the loader should work also with Polymer 1.x.

## Folder structure (example)

    |– src
    | |– awesome-component
    | | |– index.js
    | | |- template.html
    | | |- style.postcss
    | |
    | |- global-style.postcss
    | |- main-entry.js
    |
    |– postcss.config.js
    |– webpack.config.js

## `awesome-component/template.html` (example)

```html

<!-- This should be resolved by the `wc-loader` -->
<link rel="import" src="./path/to/polymer.html">

<dom-module id="awesome-component">
  <postcss src="./../global-style.postcss"></postcss>
  <postcss src="./style.postcss"></postcss>
  <template>
    <div class="TestDivOne"></div>
    <div class="TestDivTwo"></div>
  </template>
</dom-module>

```

## `awesome-component/index.js` (example)

```js

'use strict';

import './template.html';

class AwesomeComponent extends Polymer.Element {
  static get is() { return 'awesome-component' };
  static get properties() {
    return {
        prop1: {
        type: String,
        value: 'This is awesome!'
      }
    }
  };
};

window.customElements.define(AwesomeComponent.is, AwesomeComponent);

```

## `main-entry.js` (example)

```js

'use strict';

// import Polymer from 'polymer'; Aaaaaaaah if we could...!
import './src/awesome-component';

```


## Contribute

This is currently a POC, so if you have some ideas or better solutions just open an issue and let's talk! :+1:

## License

MIT © LasaleFamine