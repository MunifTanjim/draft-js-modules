import { invokeHandlers } from '../../utils/invokeHandlers'

type Hook = import('../../types').Hook
type HookProps = import('../../types').HookProps
type RegularEditorProps = import('../../types').RegularEditorProps

export const getHandleBeforeInput = (
  hooks: Hook[],
  props: RegularEditorProps | HookProps
): NonNullable<HookProps['handleBeforeInput']> => (
  ...parameters
): Draft.DraftHandleValue => {
  const handlers = [props.handleBeforeInput].concat(
    hooks.map(
      ({ handleBeforeInput }): HookProps['handleBeforeInput'] =>
        handleBeforeInput
    )
  )

  return invokeHandlers(handlers, parameters)
}
