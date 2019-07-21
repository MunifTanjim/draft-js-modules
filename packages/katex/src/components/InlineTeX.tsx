import { EditorState } from 'draft-js'
import React, { useCallback, useEffect, useState } from 'react'
import { saveTeX } from '../modifiers/saveTeX'
import TeX from './TeX'
import TeXInput from './TeXInput'

type ContentState = import('draft-js').ContentState
type Internals = import('../types').Internals
type Store = import('@draft-js-hooks/editor').Store
type TeXType = import('../types').TeXType

type InlineTeXProps = {
  children: any
  contentState: ContentState
  entityKey: string
  offsetKey: string
  store: Store
  internals: Internals
}

export type TeXState = {
  editing: boolean
  tex: string
  type: TeXType
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
  const [state, _setState] = useState(
    getInitialState.bind(null, contentState, entityKey)
  )
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

      const blockKey = offsetKey.split('-')[0]
      const startPos: number = React.Children.toArray(children)[0].props.start

      const [newContentState, newSelection, needRemove] = saveTeX({
        after,
        contentState,
        tex,
        type,
        entityKey,
        blockKey,
        startPos
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
    [children, contentState, entityKey, offsetKey, setState, state, store]
  )

  useEffect((): void => {
    if (state.editing) {
      store.setReadOnly(true)
    }
  }, [state.editing, store])

  const editingState = internals.getEditingState()
  if (editingState.key === entityKey) {
    setEditing(editingState.key)
  }

  return (
    <span className="draft-js-hooks-katex">
      {state.editing && (
        <TeXInput
          save={save}
          state={state}
          setState={setState}
          getCaretPos={getCaretPos}
        />
      )}
      <TeX
        state={state}
        onClick={(): void => setEditing()}
        data-offset-key={offsetKey}
      />
    </span>
  )
}

export default InlineTeX
