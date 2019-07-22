# @draft-js-hooks/katex

## Installation

```sh
# using npm:
npm install --save @draft-js-hooks/katex katex

# using yarn:
yarn add @draft-js-hooks/katex katex
```

## Usage

```js
import { getKaTeXHook } from '@draft-js-hooks/katex'
import '@draft-js-hooks/katex/dist/styles.css'
import 'katex/dist/katex.min.css'

const KaTeXHook = getKaTeXHook()

const hooks = [KaTeXHook]
```
