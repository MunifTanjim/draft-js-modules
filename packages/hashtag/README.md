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
import { getHashtagModule } from '@draft-js-modules/hashtag'

const HashtagModule = getHashtagModule({
  Component: ({ children }) => {
    return (
      <span style={{ color: 'rebeccapurple' }}>
        {children}
      </span>
    )
  }
})

const modules = [HashtagModule]
```
