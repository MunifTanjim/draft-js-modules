# @draft-js-hooks/hashtag

## Installation

```sh
# using npm:
npm install --save @draft-js-hooks/hashtag

# using yarn:
yarn add @draft-js-hooks/hashtag
```

## Usage

```js
import { getHashtagHook } from '@draft-js-hooks/hashtag'

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
