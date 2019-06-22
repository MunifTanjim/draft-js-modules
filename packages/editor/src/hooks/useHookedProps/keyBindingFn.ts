import { getDefaultKeyBinding } from 'draft-js'

type DraftEditorCommand = import('draft-js').DraftEditorCommand
type KeyboardEvent = import('react').KeyboardEvent
type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getKeyBindingFn = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<RegularEditorProps['keyBindingFn']> => (
  event: KeyboardEvent
): DraftEditorCommand | string | null => {
  const keyBindingFns = [props.keyBindingFn].concat(
    hooks.map(
      ({ keyBindingFn }): RegularEditorProps['keyBindingFn'] => keyBindingFn
    )
  )

  for (const keyBindingFn of keyBindingFns) {
    if (typeof keyBindingFn === 'undefined') continue
    const editorCommand = keyBindingFn(event)
    if (editorCommand) return editorCommand
  }

  return getDefaultKeyBinding(event)
}
