import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type EditorProps = import('../../types').EditorProps
type Module = import('../../types').Module
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getHandleDroppedFiles = (
  modules: Module[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['handleDroppedFiles']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handleDroppedFiles].concat(
    modules.map(
      ({ handleDroppedFiles }): EditorProps['handleDroppedFiles'] =>
        handleDroppedFiles
    )
  )

  return invokeHandlers(handlers, parameters, store)
}
