import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type EditorProps = import('../../types').EditorProps
type Hook = import('../../types').Hook
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getHandlePastedFiles = (
  hooks: Hook[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['handlePastedFiles']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handlePastedFiles].concat(
    hooks.map(
      ({ handlePastedFiles }): EditorProps['handlePastedFiles'] =>
        handlePastedFiles
    )
  )

  return invokeHandlers(handlers, parameters, store)
}
