import { invokeHandlers } from '../../utils/invokeHandlers'

type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getHandlePastedFiles = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<Draft.EditorProps['handlePastedFiles']> => (
  ...parameters
): Draft.DraftHandleValue => {
  const handlers = [props.handlePastedFiles].concat(
    hooks.map(
      ({ handlePastedFiles }): Draft.EditorProps['handlePastedFiles'] =>
        handlePastedFiles
    )
  )

  return invokeHandlers(handlers, parameters)
}
