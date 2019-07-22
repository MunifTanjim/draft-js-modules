import React, { useCallback } from 'react'
import { saveInlineTeX } from '../modifiers/saveTeX'
import { useTeXUtils } from '../utils/useTeXUtils'
import TeX from './TeX'
import TeXInput from './TeXInput'

type ContentState = import('draft-js').ContentState
type Internals = import('../types').Internals
type Store = import('@draft-js-hooks/editor').Store
type TeXState = import('./types').TeXState

type InlineTeXProps = {
  children: any
  contentState: ContentState
  entityKey: string
  offsetKey: string
  store: Store
  internals: Internals
}

const getInitialState = (
  contentState: ContentState,
  entityKey: string
): TeXState => {
  const entity = contentState.getEntity(entityKey)
  const { tex, type } = entity.getData() as Pick<TeXState, 'tex' | 'type'>

  return {
    editing: tex.length === 0,
    tex,
    type
  }
}

function InlineTeX({
  children,
  contentState,
  entityKey,
  offsetKey,
  store,
  internals
}: InlineTeXProps): React.ReactElement {
  const { state, setState, getCaretPos, submitTeX, onClickEdit } = useTeXUtils(
    getInitialState.bind(null, contentState, entityKey),
    store,
    internals,
    entityKey
  )

  const finishEditing = useCallback(
    (after: boolean): void => {
      setState({ editing: false })

      const { tex, type } = state

      const blockKey = offsetKey.split('-')[0]
      const startPos: number = React.Children.toArray(children)[0].props.start

      const [newContentState, newSelection, needsRemoval] = saveInlineTeX({
        contentState,
        tex,
        type,
        after,
        blockKey,
        entityKey,
        startPos
      })

      submitTeX(newContentState, newSelection, needsRemoval)
    },
    [children, contentState, entityKey, offsetKey, setState, state, submitTeX]
  )

  return (
    <span
      className={`draft-js-hooks-katex INLINETEX${
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
      <TeX state={state} onClick={onClickEdit} data-offset-key={offsetKey} />
    </span>
  )
}

export default InlineTeX
