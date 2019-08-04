import { hashtagStrategy } from './strategy'
import { HashtagComponent } from './component'

type HashtagHookConfig = import('../types').HashtagHookConfig
type DraftDecorator = import('draft-js').DraftDecorator

export function getHashtagDecorator(config: HashtagHookConfig): DraftDecorator {
  return {
    strategy: hashtagStrategy,
    component: config.Component || HashtagComponent,
    props: Object.assign(
      { className: 'draft-js-modules-hashtag' },
      config.props
    )
  }
}
