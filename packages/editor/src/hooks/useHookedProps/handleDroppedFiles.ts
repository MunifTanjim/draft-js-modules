import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getHandleDroppedFiles = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<RegularEditorProps['handleDroppedFiles']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handleDroppedFiles].concat(
    hooks.map(
      ({ handleDroppedFiles }): RegularEditorProps['handleDroppedFiles'] =>
        handleDroppedFiles
    )
  )

  return invokeHandlers(handlers, parameters)
}
