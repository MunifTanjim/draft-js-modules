import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getHandlePastedText = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<RegularEditorProps['handlePastedText']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handlePastedText].concat(
    hooks.map(
      ({ handlePastedText }): RegularEditorProps['handlePastedText'] =>
        handlePastedText
    )
  )

  return invokeHandlers(handlers, parameters)
}
