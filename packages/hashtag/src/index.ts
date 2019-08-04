import { getHashtagDecorator } from './decorator'

export * from './types'

type HashtagModule = import('./types').HashtagModule
type HashtagModuleConfig = import('./types').HashtagModuleConfig

export function getHashtagModule(
  config: HashtagModuleConfig = {}
): HashtagModule {
  const hashtagDecorator = getHashtagDecorator(config)

  const decorators = [hashtagDecorator]

  return {
    decorators
  }
}
