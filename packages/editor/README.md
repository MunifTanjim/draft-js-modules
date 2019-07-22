# @draft-js-hooks/editor

## Installation

```sh
# using npm:
npm install --save @draft-js-hooks/editor

# using yarn:
yarn add @draft-js-hooks/editor
```

## Usage

```js
import { Editor } from '@draft-js-hooks/editor'
import { EditorState } from 'draft-js'
import 'draft-js/dist/Draft.css'
import React, { useCallback, useRef, useState } from 'react'

const hooks = []

function DraftEditor() {
  const store = useRef(null)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onClick = useCallback(() => {
    store.current.getEditor().focus()
  }, [])

  const onChange = useCallback(editorState => {
    setEditorState(editorState)
  }, [])

  return (
    <div onClick={onClick}>
      <Editor
        editorState={editorState}
        onChange={onChange}
        placeholder="Draft.js Hooks Editor"
        hooks={hooks}
        store={store}
      />
    </div>
  )
}

export default DraftEditor
```
