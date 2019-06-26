import { RichUtils } from 'draft-js'
import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftEditorCommand = import('draft-js').DraftEditorCommand
type DraftHandleValue = import('draft-js').DraftHandleValue
type EditorProps = import('../../types').EditorProps
type EditorState = import('draft-js').EditorState
type Hook = import('../../types').Hook
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

const defaultHandleKeyCommand = (
  store: Store,
  command: DraftEditorCommand | string,
  editorState: EditorState
): DraftHandleValue => {
  const newEditorState = RichUtils.handleKeyCommand(editorState, command)

  if (newEditorState) {
    store.setEditorState(newEditorState)
    return 'handled'
  }

  return 'not-handled'
}

export const getHandleKeyCommand = (
  hooks: Hook[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['handleKeyCommand']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handleKeyCommand]
    .concat(
      hooks.map(
        ({ handleKeyCommand }): EditorProps['handleKeyCommand'] =>
          handleKeyCommand
      )
    )
    .concat(defaultHandleKeyCommand)

  return invokeHandlers(handlers, parameters, store)
}
