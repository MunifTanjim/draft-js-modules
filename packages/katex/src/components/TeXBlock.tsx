import React, { useCallback } from 'react'
import { saveTeXBlock } from '../modifiers/saveTeX'
import { useTeXUtils } from '../utils/useTeXUtils'
import TeX from './TeX'
import TeXInput from './TeXInput'

type ContentBlock = import('draft-js').ContentBlock
type ContentState = import('draft-js').ContentState
type Internals = import('../types').Internals
type Store = import('@draft-js-hooks/editor').Store
type TeXState = import('./types').TeXState

type TeXBlockProps = {
  block: ContentBlock
  blockProps: { store: Store; internals: Internals }
  contentState: ContentState
}

const getInitialState = (block: ContentBlock): TeXState => {
  const { tex, type } = block.getData().toObject() as Pick<
    TeXState,
    'tex' | 'type'
  >

  return {
    editing: tex.length === 0,
    tex,
    type
  }
}

function TeXBlock({
  block,
  blockProps: { store, internals },
  contentState
}: TeXBlockProps): React.ReactElement {
  const blockKey = block.getKey()

  const { state, setState, startEditing, getCaretPos, submitTeX } = useTeXUtils(
    getInitialState.bind(null, block),
    store,
    internals,
    blockKey
  )

  const finishEditing = useCallback(
    (after?: boolean): void => {
      setState({ editing: false })

      const { tex, type } = state

      const [newContentState, newSelection, needsRemoval] = saveTeXBlock({
        contentState,
        tex,
        type,
        after,
        block
      })

      submitTeX(newContentState, newSelection, needsRemoval)
    },
    [block, contentState, setState, state, submitTeX]
  )

  return (
    <div
      className={`draft-js-hooks-katex TEXBLOCK${
        state.editing ? ' editing' : ''
      }`}
    >
      {state.editing && (
        <TeXInput
          state={state}
          setState={setState}
          getCaretPos={getCaretPos}
          finishEditing={finishEditing}
        />
      )}
      <TeX state={state} onClick={(): void => startEditing()} />
    </div>
  )
}

export default TeXBlock
