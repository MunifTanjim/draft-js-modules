import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getHandleReturn = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<RegularEditorProps['handleReturn']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handleReturn].concat(
    hooks.map(
      ({ handleReturn }): RegularEditorProps['handleReturn'] => handleReturn
    )
  )

  return invokeHandlers(handlers, parameters)
}
