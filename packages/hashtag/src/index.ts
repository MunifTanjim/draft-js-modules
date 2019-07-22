import { getHashtagDecorator } from './decorator'

export * from './types'

type HashtagHook = import('./types').HashtagHook
type HashtagHookConfig = import('./types').HashtagHookConfig

export function getHashtagHook(config: HashtagHookConfig = {}): HashtagHook {
  const hashtagDecorator = getHashtagDecorator(config)

  const decorators = [hashtagDecorator]

  return {
    decorators
  }
}
