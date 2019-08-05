/** @jsx jsx */
import { Editor } from '@draft-js-modules/editor'
import { EditorState } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { jsx } from 'theme-ui'

const styles = {
  Container: {
    maxWidth: '100%'
  },
  EditorWrapper: {
    border: '1px solid #ddd',
    borderRadius: 3,
    width: '100%',
    padding: '1em',
    minHeight: '100px',
    background: '#fff',
    color: '#000'
  }
}

function BaseEditor({ modules, Top, Bottom, ...props }) {
  const store = useRef(null)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const onClick = useCallback(() => {
    store.current.getEditor().focus()
  }, [])

  return (
    <div sx={styles.Container}>
      {Top && <Top />}
      <div sx={styles.EditorWrapper} role="presentation" onClick={onClick}>
        {mounted ? (
          <Editor
            {...props}
            editorState={editorState}
            onChange={setEditorState}
            modules={modules}
            store={store}
          />
        ) : null}
      </div>
      {Bottom && <Bottom />}
    </div>
  )
}

export default BaseEditor
