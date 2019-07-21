import { getInlineTeXDecorator } from './decorator/index'
import {
  getBlockRendererFn,
  getHandleKeyCommand,
  keyBindingFn
} from './utils/index'

export * from './types'

type EditingState = import('./types').EditingState
type Internals = import('./types').Internals
type KaTeXHook = import('./types').KaTeXHook
type KaTeXHookConfig = import('./types').KaTeXHookConfig
type Store = import('@draft-js-hooks/editor').Store

function getInternals(config?: KaTeXHookConfig): Internals {
  const state: EditingState = { key: '' }

  const getEditingState = (): EditingState => {
    return state
  }

  const setEditingState = (editingState: EditingState): void => {
    Object.assign(state, editingState)
  }

  return {
    getEditingState,
    setEditingState
  }
}

export function getKaTeXHook(config: KaTeXHookConfig): KaTeXHook {
  const internals: Internals = getInternals(config)

  const store: Partial<Store> = {}

  const inlineTeXDecorator = getInlineTeXDecorator(config, {
    store: store as Store,
    internals
  })

  function init(editorStore: Store): void {
    Object.assign(store, editorStore)
  }

  const decorators = [inlineTeXDecorator]

  return {
    init,
    decorators,
    blockRendererFn: getBlockRendererFn(internals),
    handleKeyCommand: getHandleKeyCommand(internals),
    keyBindingFn
  }
}
