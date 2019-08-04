import { inlineTeXStrategy } from './strategy'
import InlineTeX from '../components/InlineTeX'

type DraftDecorator = import('draft-js').DraftDecorator
type Internals = import('../types').Internals
type KaTeXHookConfig = import('../types').KaTeXHookConfig
type Store = import('@draft-js-modules/editor').Store

export function getInlineTeXDecorator(
  config: KaTeXHookConfig,
  props: { store: Store; internals: Internals }
): DraftDecorator {
  return {
    strategy: inlineTeXStrategy,
    component: InlineTeX,
    props
  }
}
