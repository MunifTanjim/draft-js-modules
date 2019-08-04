import { getInlineTeXDecorator } from './decorator'
import { getBlockRendererFn, getHandleKeyCommand, keyBindingFn } from './utils'
import { getInternals } from './utils/getInternals'

export * from './types'

type KaTeXModule = import('./types').KaTeXModule
type KaTeXModuleConfig = import('./types').KaTeXModuleConfig
type Store = import('@draft-js-modules/editor').Store

export function getKaTeXModule(config: KaTeXModuleConfig = {}): KaTeXModule {
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
