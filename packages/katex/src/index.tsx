import { getInlineTeXDecorator } from './decorator'
import { getBlockRendererFn, getHandleKeyCommand, keyBindingFn } from './utils'
import { getInternals } from './utils/getInternals'

export * from './types'

type KaTeXHook = import('./types').KaTeXHook
type KaTeXHookConfig = import('./types').KaTeXHookConfig
type Store = import('@draft-js-hooks/editor').Store

export function getKaTeXHook(config: KaTeXHookConfig = {}): KaTeXHook {
  const internals = getInternals(config)

  const store: Partial<Store> = {}

  const inlineTeXDecorator = getInlineTeXDecorator(config, {
    store: store as Store,
    internals
  })

  const decorators = [inlineTeXDecorator]
  const blockRendererFn = getBlockRendererFn(internals)
  const handleKeyCommand = getHandleKeyCommand(internals)

  function init(editorStore: Store): void {
    Object.assign(store, editorStore)
  }

  return {
    init,
    decorators,
    blockRendererFn,
    handleKeyCommand,
    keyBindingFn
  }
}
