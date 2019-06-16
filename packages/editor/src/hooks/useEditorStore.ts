import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Hook = import('../types').Hook
type InternalStore = import('../types').InternalStore
type RegularEditorProps = import('../types').RegularEditorProps
type Store = import('../types').Store

export function useEditorStore(
  hooks: Hook[],
  {
    readOnly: _readOnly = false,
    editorState: _editorState,
    onChange: _onChange
  }: RegularEditorProps
): InternalStore {
  const onChange = useCallback(
    (editorState): void => {
      let newEditorState = editorState
      hooks.forEach(({ onChange }): void => {
        if (onChange) newEditorState = onChange(newEditorState)
      })
      _onChange(newEditorState)
    },
    [_onChange, hooks]
  )

  const [__readOnly, setReadOnly] = useState(_readOnly)
  useEffect((): void => {
    setReadOnly(_readOnly)
  }, [_readOnly])
  const readOnly = useMemo((): boolean => {
    return __readOnly || _readOnly
  }, [__readOnly, _readOnly])

  const editor = useRef<Draft.Editor>(null)
  const state = useRef({ editorState: _editorState, readOnly })
  state.current.editorState = _editorState
  state.current.readOnly = readOnly

  const store = useRef<Store>({
    getEditor: (): Draft.Editor | null => editor.current,
    getEditorState: (): Draft.EditorState => state.current.editorState,
    setEditorState: onChange,
    getReadOnly: (): boolean => state.current.readOnly,
    setReadOnly
  })

  const getStore = useCallback((): Store => {
    return store.current
  }, [])

  useEffect((): void => {
    hooks.forEach(({ init }): void => {
      if (init) init(store.current)
    })
  }, [hooks])

  return {
    editor,
    editorState: _editorState,
    setEditorState: onChange,
    readOnly,
    setReadOnly,
    getStore
  }
}
