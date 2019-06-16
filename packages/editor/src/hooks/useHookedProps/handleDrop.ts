import { invokeHandlers } from '../../utils/invokeHandlers'

type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getHandleDrop = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<Draft.EditorProps['handleDrop']> => (
  ...parameters
): Draft.DraftHandleValue => {
  const handlers = [props.handleDrop].concat(
    hooks.map(({ handleDrop }): Draft.EditorProps['handleDrop'] => handleDrop)
  )

  return invokeHandlers(handlers, parameters)
}
