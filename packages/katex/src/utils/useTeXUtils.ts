import { EditorState } from 'draft-js'
import { useCallback, useEffect, useState } from 'react'

type ContentState = import('draft-js').ContentState
type Internals = import('../types').Internals
type SelectionState = import('draft-js').SelectionState
type Store = import('@draft-js-hooks/editor').Store
type TeXState = import('../components/types').TeXState

export function useTeXUtils(
  getInitialState: (...params: any) => TeXState,
  store: Store,
  internals: Internals,
  key: string
): {
  state: TeXState
  setState: (newState: Partial<TeXState>) => void
  startEditing: (key?: string) => void
  getCaretPos: () => number
  submitTeX: (
    newContentState: ContentState,
    newSelection: SelectionState,
    needsRemoval: boolean
  ) => void
} {
  const [state, _setState] = useState(getInitialState)

  const setState = useCallback(
    (newState: Partial<TeXState>): void => {
      _setState((state): TeXState => ({ ...state, ...newState }))
    },
    [_setState]
  )

  const startEditing = useCallback(
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

  const submitTeX = useCallback(
    (
      newContentState: ContentState,
      newSelection: SelectionState,
      needsRemoval: boolean
    ): void => {
      store.setReadOnly(false)

      const newEditorState = EditorState.push(
        store.getEditorState(),
        newContentState,
        needsRemoval ? 'remove-range' : ('update-tex' as any)
      )

      if (newSelection) {
        store.setEditorState(
          EditorState.forceSelection(newEditorState, newSelection)
        )
        setTimeout((): void => store.getEditor()!.focus(), 5)
      } else {
        store.setEditorState(newEditorState)
      }
    },
    [store]
  )

  useEffect((): void => {
    if (state.editing) {
      store.setReadOnly(true)
    }
  }, [state.editing, store])

  const editingState = internals.getEditingState()
  if (editingState.key === key) {
    startEditing(editingState.key)
  }

  return {
    state,
    setState,
    startEditing,
    getCaretPos,
    submitTeX
  }
}
