type EditingState = import('../types').EditingState
type Internals = import('../types').Internals
type KaTeXHookConfig = import('../types').KaTeXHookConfig

export function getInternals(config: KaTeXHookConfig): Internals {
  const editingState: EditingState = { key: '' }

  const getEditingState = (): EditingState => {
    return editingState
  }

  const setEditingState = (newEditingState: Partial<EditingState>): void => {
    Object.assign(editingState, newEditingState)
  }

  return {
    getEditingState,
    setEditingState
  }
}
