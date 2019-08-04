# @draft-js-modules/hashtag

## Installation

```sh
# using npm:
npm install --save @draft-js-modules/hashtag

# using yarn:
yarn add @draft-js-modules/hashtag
```

## Usage

```js
import { getHashtagHook } from '@draft-js-modules/hashtag'

const HashtagHook = getHashtagHook({
  Component: ({ children }) => {
    return (
      <span style={{ color: 'rebeccapurple' }}>
        {children}
      </span>
    )
  }
})

const hooks = [HashtagHook]
```
