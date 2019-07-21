import React, { useCallback, useEffect, useState } from 'react'
import TeX from './TeX'
import { saveTeX } from '../modifiers/saveTeX'
import { EditorState } from 'draft-js'
import TeXInput from './TeXInput'

type ContentBlock = import('draft-js').ContentBlock
type ContentState = import('draft-js').ContentState
type Internals = import('../types').Internals
type Store = import('@draft-js-hooks/editor').Store
type TeXType = import('../types').TeXType

type TeXBlockProps = {
  block: ContentBlock
  blockProps: { store: Store; internals: Internals }
  contentState: ContentState
}

export type TeXState = {
  editing: boolean
  tex: string
  type: TeXType
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
  const [state, _setState] = useState(getInitialState.bind(null, block))
  const setState = useCallback((newState: Partial<TeXState>): void => {
    _setState((state): TeXState => ({ ...state, ...newState }))
  }, [])

  const setEditing = useCallback(
    (key?: string): void => {
      const readOnly = store.getReadOnly()

      if (readOnly || state.editing) return

      setState({ editing: true })
      if (key) {
        internals.setEditingState({ key: '' })
      }
    },
    [internals, setState, state.editing, store]
  )

  const getCaretPos = useCallback((): number => {
    const editingState = internals.getEditingState()

    if (!editingState.dir || editingState.dir === 'l') {
      return state.tex.length
    }

    return 0
  }, [internals, state.tex.length])

  const save = useCallback(
    (after?: number): void => {
      setState({ editing: false })

      const { tex, type } = state

      const [newContentState, newSelection, needRemove] = saveTeX({
        after,
        contentState,
        tex,
        type,
        block
      })

      store.setReadOnly(false)

      const newEditorState = EditorState.push(
        store.getEditorState(),
        newContentState,
        needRemove ? 'remove-range' : ('update-tex' as any)
      )

      if (newSelection) {
        store.setEditorState(
          EditorState.forceSelection(newEditorState, newSelection)
        )
        setTimeout((): void => {
          store.getEditor()!.focus()
        }, 5)
      } else {
        store.setEditorState(newEditorState)
      }
    },
    [block, contentState, setState, state, store]
  )

  useEffect((): void => {
    if (state.editing) {
      store.setReadOnly(true)
    }
  }, [state.editing, store])

  const editingState = internals.getEditingState()
  if (editingState.key === block.getKey()) {
    setEditing(editingState.key)
  }

  return (
    <div className="draft-js-hooks-katex">
      {state.editing && (
        <TeXInput
          save={save}
          state={state}
          setState={setState}
          getCaretPos={getCaretPos}
        />
      )}
      <TeX state={state} onClick={(): void => setEditing()} />
    </div>
  )
}

export default TeXBlock
