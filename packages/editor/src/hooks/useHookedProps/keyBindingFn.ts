import { getDefaultKeyBinding } from 'draft-js'

type KeyboardEvent = import('react').KeyboardEvent
type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getKeyBindingFn = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<Draft.EditorProps['keyBindingFn']> => (
  event: KeyboardEvent
): Draft.DraftEditorCommand | string | null => {
  const keyBindingFns = [props.keyBindingFn].concat(
    hooks.map(
      ({ keyBindingFn }): Draft.EditorProps['keyBindingFn'] => keyBindingFn
    )
  )

  for (const keyBindingFn of keyBindingFns) {
    if (typeof keyBindingFn === 'undefined') continue
    const editorCommand = keyBindingFn(event)
    if (editorCommand) return editorCommand
  }

  return getDefaultKeyBinding(event)
}
