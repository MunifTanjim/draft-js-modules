import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type EditorProps = import('../../types').EditorProps
type Module = import('../../types').Module
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getHandleDrop = (
  modules: Module[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['handleDrop']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handleDrop].concat(
    modules.map(({ handleDrop }): EditorProps['handleDrop'] => handleDrop)
  )

  return invokeHandlers(handlers, parameters, store)
}
