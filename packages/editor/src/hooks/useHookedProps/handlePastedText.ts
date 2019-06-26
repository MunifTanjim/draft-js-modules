import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type EditorProps = import('../../types').EditorProps
type Hook = import('../../types').Hook
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getHandlePastedText = (
  hooks: Hook[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['handlePastedText']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handlePastedText].concat(
    hooks.map(
      ({ handlePastedText }): EditorProps['handlePastedText'] =>
        handlePastedText
    )
  )

  return invokeHandlers(handlers, parameters, store)
}
