type EditingState = import('../types').EditingState
type Internals = import('../types').Internals
type KaTeXModuleConfig = import('../types').KaTeXModuleConfig

export function getInternals(config: KaTeXModuleConfig): Internals {
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
