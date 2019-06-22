import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getHandleBeforeInput = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<RegularEditorProps['handleBeforeInput']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handleBeforeInput].concat(
    hooks.map(
      ({ handleBeforeInput }): RegularEditorProps['handleBeforeInput'] =>
        handleBeforeInput
    )
  )

  return invokeHandlers(handlers, parameters)
}
