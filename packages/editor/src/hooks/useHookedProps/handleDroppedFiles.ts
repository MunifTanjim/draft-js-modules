import { invokeHandlers } from '../../utils/invokeHandlers'

type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getHandleDroppedFiles = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<Draft.EditorProps['handleDroppedFiles']> => (
  ...parameters
): Draft.DraftHandleValue => {
  const handlers = [props.handleDroppedFiles].concat(
    hooks.map(
      ({ handleDroppedFiles }): Draft.EditorProps['handleDroppedFiles'] =>
        handleDroppedFiles
    )
  )

  return invokeHandlers(handlers, parameters)
}
