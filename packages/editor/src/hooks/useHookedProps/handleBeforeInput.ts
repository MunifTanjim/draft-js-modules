import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftHandleValue = import('draft-js').DraftHandleValue
type EditorProps = import('../../types').EditorProps
type Hook = import('../../types').Hook
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getHandleBeforeInput = (
  hooks: Hook[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['handleBeforeInput']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handleBeforeInput].concat(
    hooks.map(
      ({ handleBeforeInput }): EditorProps['handleBeforeInput'] =>
        handleBeforeInput
    )
  )

  return invokeHandlers(handlers, parameters, store)
}
