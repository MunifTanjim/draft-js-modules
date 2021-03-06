import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type EditorProps = import('../types').EditorProps
type EditorState = import('draft-js').EditorState
type InternalStore = import('../types').InternalStore
type Module = import('../types').Module
type Store = import('../types').Store

export function useEditorStore(
  modules: Module[],
  { readOnly: _readOnly = false, editorState, onChange }: EditorProps
): InternalStore {
  const setEditorState = useCallback<EditorProps['onChange']>(
    (editorState: EditorState): void => {
      let newEditorState = editorState
      modules.forEach(({ onChange }): void => {
        if (onChange) newEditorState = onChange(newEditorState)
      })
      onChange(newEditorState)
    },
    [modules, onChange]
  )

  const [__readOnly, setReadOnly] = useState(_readOnly)
  useEffect((): void => {
    setReadOnly(_readOnly)
  }, [_readOnly])
  const readOnly = useMemo((): boolean => {
    return __readOnly || _readOnly
  }, [__readOnly, _readOnly])

  const editor = useRef<Draft.Editor>(null)
  const state = useRef({ editorState: editorState, readOnly })
  state.current.editorState = editorState
  state.current.readOnly = readOnly

  const store = useRef<Store>({
    getEditor: (): Draft.Editor | null => editor.current,
    getEditorState: (): Draft.EditorState => state.current.editorState,
    setEditorState,
    getReadOnly: (): boolean => state.current.readOnly,
    setReadOnly
  })

  const getStore = useCallback((): Store => {
    return store.current
  }, [])

  useEffect((): void => {
    modules.forEach(({ init }): void => {
      if (init) init(store.current)
    })
  }, [modules])

  return {
    editor,
    editorState,
    setEditorState,
    readOnly,
    setReadOnly,
    getStore
  }
}
