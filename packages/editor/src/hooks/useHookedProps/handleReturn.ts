import { invokeHandlers } from '../../utils/invokeHandlers'

type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getHandleReturn = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<Draft.EditorProps['handleReturn']> => (
  ...parameters
): Draft.DraftHandleValue => {
  const handlers = [props.handleReturn].concat(
    hooks.map(
      ({ handleReturn }): Draft.EditorProps['handleReturn'] => handleReturn
    )
  )

  return invokeHandlers(handlers, parameters)
}
