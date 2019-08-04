import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type EditorProps = import('../../types').EditorProps
type Module = import('../../types').Module
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getHandleReturn = (
  modules: Module[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['handleReturn']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handleReturn].concat(
    modules.map(({ handleReturn }): EditorProps['handleReturn'] => handleReturn)
  )

  return invokeHandlers(handlers, parameters, store)
}
