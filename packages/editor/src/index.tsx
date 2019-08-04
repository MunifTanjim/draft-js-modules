import { Editor as RegularEditor } from 'draft-js'
import React, { useEffect } from 'react'
import { useCompositeDecorator } from './hooks/useCompositeDecorator'
import { useEditorStore } from './hooks/useEditorStore'
import { useHookedProps } from './hooks/useHookedProps'

export * from './types'

type EditorProps = import('./types').EditorProps
type Module = import('./types').Module

const emptyModules: Module[] = []

export function Editor({
  modules = emptyModules,
  store,
  ...props
}: EditorProps): React.ReactElement {
  const {
    editor,
    editorState,
    setEditorState,
    readOnly,
    getStore
  } = useEditorStore(modules, props)

  useEffect((): void => {
    if (store) store.current = getStore()
  }, [getStore, store])

  useCompositeDecorator(modules, props, getStore)

  const hookedProps = useHookedProps(modules, props, getStore)

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
