import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type EditorProps = import('../../types').EditorProps
type Module = import('../../types').Module
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getHandleBeforeInput = (
  modules: Module[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['handleBeforeInput']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handleBeforeInput].concat(
    modules.map(
      ({ handleBeforeInput }): EditorProps['handleBeforeInput'] =>
        handleBeforeInput
    )
  )

  return invokeHandlers(handlers, parameters, store)
}
