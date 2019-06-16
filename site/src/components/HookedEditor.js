import { Editor } from '@draft-js-hooks/editor'
import { getStatsHook } from '@draft-js-hooks/stats'
import { EditorState } from 'draft-js'
import 'draft-js/dist/Draft.css'
import React, { useCallback, useRef, useState } from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'

const EditorWrapper = styled(Box)`
  border: 1px solid #ddd;
  max-width: 520px;
  padding: 1em;
  min-height: 100px;
`

const Seperator = styled.hr`
  margin: 0.5em 0;
`

const StatsHook = getStatsHook()

const hooks = [StatsHook]

function HookedEditor() {
  const store = useRef(null)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onClick = useCallback(() => {
    store.current.getEditor().focus()
  }, [])

  const onChange = useCallback(editorState => {
    setEditorState(editorState)
  }, [])

  return (
    <EditorWrapper onClick={onClick} mx={'auto'}>
      <Editor
        store={store}
        editorState={editorState}
        onChange={onChange}
        placeholder="Have something to write?"
        hooks={hooks}
      />
      <Seperator />
      <StatsHook.Stats />
    </EditorWrapper>
  )
}

export default HookedEditor
