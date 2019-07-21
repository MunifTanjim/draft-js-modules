import { Editor as RegularEditor } from 'draft-js'
import React, { useEffect } from 'react'
import { useCompositeDecorator } from './hooks/useCompositeDecorator'
import { useEditorStore } from './hooks/useEditorStore'
import { useHookedProps } from './hooks/useHookedProps'

export * from './types'

type Hook = import('./types').Hook
type EditorProps = import('./types').EditorProps

const emptyHooks: Hook[] = []

export function Editor({
  hooks = emptyHooks,
  store,
  ...props
}: EditorProps): React.ReactElement {
  const {
    editor,
    editorState,
    setEditorState,
    readOnly,
    getStore
  } = useEditorStore(hooks, props)

  useEffect((): void => {
    if (store) store.current = getStore()
  }, [getStore, store])

  useCompositeDecorator(hooks, props, getStore)

  const hookedProps = useHookedProps(hooks, props, getStore)

  return (
    <RegularEditor
      {...hookedProps}
      editorState={editorState}
      onChange={setEditorState}
      readOnly={readOnly}
      ref={editor}
    />
  )
}

export default Editor
