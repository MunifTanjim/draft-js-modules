import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type EditorProps = import('../../types').EditorProps
type Hook = import('../../types').Hook
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getHandleReturn = (
  hooks: Hook[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['handleReturn']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handleReturn].concat(
    hooks.map(({ handleReturn }): EditorProps['handleReturn'] => handleReturn)
  )

  return invokeHandlers(handlers, parameters, store)
}
