# @draft-js-modules/katex

## Installation

```sh
# using npm:
npm install --save @draft-js-modules/katex katex

# using yarn:
yarn add @draft-js-modules/katex katex
```

## Usage

```js
import { getKaTeXModule } from '@draft-js-modules/katex'
import '@draft-js-modules/katex/dist/styles.css'
import 'katex/dist/katex.min.css'

const KaTeXModule = getKaTeXModule()

const modules = [KaTeXModule]
```
