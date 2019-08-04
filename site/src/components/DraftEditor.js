import { Editor } from '@draft-js-modules/editor'
import { getHashtagModule } from '@draft-js-modules/hashtag'
import { getKaTeXModule } from '@draft-js-modules/katex'
import '@draft-js-modules/katex/dist/styles.css'
import { getStatsModule } from '@draft-js-modules/stats'
import { EditorState } from 'draft-js'
import 'draft-js/dist/Draft.css'
import 'katex/dist/katex.min.css'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'

const Container = styled(Box)`
  margin: 0 auto;
  max-width: 520px;
`

const EditorWrapper = styled(Box)`
  border: 1px solid #ddd;
  width: 100%;
  padding: 1em;
  min-height: 100px;
`

const Seperator = styled.hr`
  margin: 0.5em 0;
`

const Hashtag = styled.span`
  color: ${p => p.theme.colors.primary};
  cursor: pointer;
`

const HashtagModule = getHashtagModule({
  Component: ({ children }) => <Hashtag children={children} />
})
const KaTeXModule = getKaTeXModule()
const StatsModule = getStatsModule()

const modules = [HashtagModule, KaTeXModule, StatsModule]

function DraftEditor() {
  const store = useRef(null)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const onClick = useCallback(() => {
    store.current.getEditor().focus()
  }, [])

  const onChange = useCallback(editorState => {
    setEditorState(editorState)
  }, [])

  return (
    <Container>
      <Seperator />
      <EditorWrapper onClick={onClick} mx={'auto'}>
        {mounted ? (
          <Editor
            editorState={editorState}
            onChange={onChange}
            placeholder="Have something to write?"
            modules={modules}
            store={store}
          />
        ) : null}
      </EditorWrapper>
      <Seperator />
      <StatsModule.Stats />
    </Container>
  )
}

export default DraftEditor
