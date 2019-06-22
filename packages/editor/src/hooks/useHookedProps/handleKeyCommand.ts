import { RichUtils } from 'draft-js'
import { invokeHandlers } from '../../utils/invokeHandlers'

type DraftEditorCommand = import('draft-js').DraftEditorCommand
type DraftHandleValue = import('draft-js').DraftHandleValue
type EditorState = import('draft-js').EditorState
type GetStore = import('../../types').GetStore
type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

const getDefaultHandleKeyCommand = (
  getStore: GetStore
): NonNullable<RegularEditorProps['handleKeyCommand']> => (
  command: DraftEditorCommand,
  editorState: EditorState
): DraftHandleValue => {
  const newEditorState = RichUtils.handleKeyCommand(editorState, command)

  if (newEditorState) {
    getStore().setEditorState(newEditorState)
    return 'handled'
  }

  return 'not-handled'
}

export const getHandleKeyCommand = (
  hooks: Hook[],
  props: RegularEditorProps,
  getStore: GetStore
): NonNullable<RegularEditorProps['handleKeyCommand']> => (
  ...parameters
): DraftHandleValue => {
  const handlers = [props.handleKeyCommand]
    .concat(
      hooks.map(
        ({ handleKeyCommand }): RegularEditorProps['handleKeyCommand'] =>
          handleKeyCommand
      )
    )
    .concat(getDefaultHandleKeyCommand(getStore))

  return invokeHandlers(handlers, parameters)
}
