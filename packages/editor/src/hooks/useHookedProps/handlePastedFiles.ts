import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getHandlePastedFiles = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<RegularEditorProps['handlePastedFiles']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handlePastedFiles].concat(
    hooks.map(
      ({ handlePastedFiles }): RegularEditorProps['handlePastedFiles'] =>
        handlePastedFiles
    )
  )

  return invokeHandlers(handlers, parameters)
}
