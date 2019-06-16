import { RichUtils } from 'draft-js'
import { invokeHandlers } from '../../utils/invokeHandlers'

type GetStore = import('../../types').GetStore
type Hook = import('../../types').Hook
type HookProps = import('../../types').HookProps
type RegularEditorProps = import('../../types').RegularEditorProps

const getDefaultHandleKeyCommand = (
  getStore: GetStore
): NonNullable<Draft.EditorProps['handleKeyCommand']> => (
  command: Draft.DraftEditorCommand,
  editorState: Draft.EditorState
): Draft.DraftHandleValue => {
  const newEditorState = RichUtils.handleKeyCommand(editorState, command)

  if (newEditorState) {
    getStore().setEditorState(newEditorState)
    return 'handled'
  }

  return 'not-handled'
}

export const getHandleKeyCommand = (
  hooks: Hook[],
  props: RegularEditorProps | HookProps,
  getStore: GetStore
): NonNullable<HookProps['handleKeyCommand']> => (
  ...parameters
): Draft.DraftHandleValue => {
  const handlers = [props.handleKeyCommand]
    .concat(
      hooks.map(
        ({ handleKeyCommand }): HookProps['handleKeyCommand'] =>
          handleKeyCommand
      )
    )
    .concat(getDefaultHandleKeyCommand(getStore))

  return invokeHandlers(handlers, parameters)
}
