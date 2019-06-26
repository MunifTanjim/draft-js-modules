import { getDefaultKeyBinding } from 'draft-js'

type DraftEditorCommand = import('draft-js').DraftEditorCommand
type EditorProps = import('../../types').EditorProps
type Hook = import('../../types').Hook
type KeyboardEvent = import('react').KeyboardEvent
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getKeyBindingFn = (
  hooks: Hook[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['keyBindingFn']> => (
  event: KeyboardEvent
): DraftEditorCommand | string | null => {
  const keyBindingFns = [props.keyBindingFn].concat(
    hooks.map(({ keyBindingFn }): EditorProps['keyBindingFn'] => keyBindingFn)
  )

  for (const keyBindingFn of keyBindingFns) {
    if (typeof keyBindingFn === 'undefined') continue
    const editorCommand = keyBindingFn(store, event)
    if (editorCommand) return editorCommand
  }

  return getDefaultKeyBinding(event)
}
