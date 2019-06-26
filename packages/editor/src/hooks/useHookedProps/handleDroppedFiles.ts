import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type EditorProps = import('../../types').EditorProps
type Hook = import('../../types').Hook
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getHandleDroppedFiles = (
  hooks: Hook[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['handleDroppedFiles']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handleDroppedFiles].concat(
    hooks.map(
      ({ handleDroppedFiles }): EditorProps['handleDroppedFiles'] =>
        handleDroppedFiles
    )
  )

  return invokeHandlers(handlers, parameters, store)
}
