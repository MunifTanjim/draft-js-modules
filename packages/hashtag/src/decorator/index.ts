import { hashtagStrategy } from './strategy'
import { HashtagComponent } from './component'

type HashtagModuleConfig = import('../types').HashtagModuleConfig
type DraftDecorator = import('draft-js').DraftDecorator

export function getHashtagDecorator(
  config: HashtagModuleConfig
): DraftDecorator {
  return {
    strategy: hashtagStrategy,
    component: config.Component || HashtagComponent,
    props: Object.assign(
      { className: 'draft-js-modules-hashtag' },
      config.props
    )
  }
}
