import { getHashtagDecorator } from './decorator'

type HashtagHook = import('./types').HashtagHook
type HashtagHookConfig = import('./types').HashtagHookConfig
type DraftDecorator = import('draft-js').DraftDecorator

export function getHashtagHook(config: HashtagHookConfig): HashtagHook {
  const hashtagDecorator = getHashtagDecorator(config)

  const decorators: DraftDecorator[] = [hashtagDecorator]

  return {
    decorators
  }
}
