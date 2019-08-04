import { getDefaultKeyBinding } from 'draft-js'

type DraftEditorCommand = import('draft-js').DraftEditorCommand
type EditorProps = import('../../types').EditorProps
type KeyboardEvent = import('react').KeyboardEvent
type Module = import('../../types').Module
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getKeyBindingFn = (
  modules: Module[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['keyBindingFn']> => (
  event: KeyboardEvent
): DraftEditorCommand | string | null => {
  const keyBindingFns = [props.keyBindingFn].concat(
    modules.map(({ keyBindingFn }): EditorProps['keyBindingFn'] => keyBindingFn)
  )

  for (const keyBindingFn of keyBindingFns) {
    if (typeof keyBindingFn === 'undefined') continue
    const editorCommand = keyBindingFn(store, event)
    if (editorCommand) return editorCommand
  }

  return getDefaultKeyBinding(event)
}
