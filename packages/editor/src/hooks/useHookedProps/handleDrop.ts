import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type EditorProps = import('../../types').EditorProps
type Hook = import('../../types').Hook
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getHandleDrop = (
  hooks: Hook[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['handleDrop']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handleDrop].concat(
    hooks.map(({ handleDrop }): EditorProps['handleDrop'] => handleDrop)
  )

  return invokeHandlers(handlers, parameters, store)
}
