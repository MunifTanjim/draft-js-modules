import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getHandleDrop = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<RegularEditorProps['handleDrop']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handleDrop].concat(
    hooks.map(({ handleDrop }): RegularEditorProps['handleDrop'] => handleDrop)
  )

  return invokeHandlers(handlers, parameters)
}
