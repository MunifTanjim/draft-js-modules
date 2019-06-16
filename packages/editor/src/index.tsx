import { Editor as RegularEditor } from 'draft-js'
import React, { useEffect } from 'react'
import { useCompositeDecorator } from './hooks/useCompositeDecorator'
import { useEditorStore } from './hooks/useEditorStore'
import { useHookedProps } from './hooks/useHookedProps'

type Hook = import('./types').Hook
type Props = import('./types').EditorProps

const emptyHooks: Hook[] = []

export function Editor({
  hooks = emptyHooks,
  store,
  ...props
}: Props): React.ReactElement {
  const {
    editor,
    editorState,
    setEditorState,
    readOnly,
    getStore
  } = useEditorStore(hooks, props)

  useCompositeDecorator(hooks, props, getStore)

  useEffect((): void => {
    if (store) store.current = getStore()
  }, [getStore, store])

  const hookedProps = useHookedProps(hooks, props, getStore)

  return (
    // @ts-ignore
    <RegularEditor
      {...props}
      {...hookedProps}
      editorState={editorState}
      onChange={setEditorState}
      readOnly={readOnly}
      ref={editor}
    />
  )
}

export default Editor
