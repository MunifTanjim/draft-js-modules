import { inlineTeXStrategy } from './strategy'
import InlineTeX from '../components/InlineTeX'

type DraftDecorator = import('draft-js').DraftDecorator
type Internals = import('../types').Internals
type KaTeXModuleConfig = import('../types').KaTeXModuleConfig
type Store = import('@draft-js-modules/editor').Store

export function getInlineTeXDecorator(
  config: KaTeXModuleConfig,
  props: { store: Store; internals: Internals }
): DraftDecorator {
  return {
    strategy: inlineTeXStrategy,
    component: InlineTeX,
    props
  }
}
