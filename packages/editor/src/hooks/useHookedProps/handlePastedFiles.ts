import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type EditorProps = import('../../types').EditorProps
type Module = import('../../types').Module
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getHandlePastedFiles = (
  modules: Module[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['handlePastedFiles']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handlePastedFiles].concat(
    modules.map(
      ({ handlePastedFiles }): EditorProps['handlePastedFiles'] =>
        handlePastedFiles
    )
  )

  return invokeHandlers(handlers, parameters, store)
}
