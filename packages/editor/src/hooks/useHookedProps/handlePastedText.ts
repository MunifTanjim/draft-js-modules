import { invokeHandlers } from '../../utils/invokeHandlers'

type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getHandlePastedText = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<Draft.EditorProps['handlePastedText']> => (
  ...parameters
): Draft.DraftHandleValue => {
  const handlers = [props.handlePastedText].concat(
    hooks.map(
      ({ handlePastedText }): Draft.EditorProps['handlePastedText'] =>
        handlePastedText
    )
  )

  return invokeHandlers(handlers, parameters)
}
