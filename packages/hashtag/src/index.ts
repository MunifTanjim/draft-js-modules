import Component from './components/DefaultHashtagComponent'
import strategy from './decorator/strategy'

type HashtagHook = import('./types').HashtagHook
type HashtagHookConfig = import('./types').HashtagHookConfig
type DraftDecorator = import('draft-js').DraftDecorator

const defaultConfig: HashtagHookConfig = { Component }

export function getHashtagHook(
  config: HashtagHookConfig = defaultConfig
): HashtagHook {
  const decorators: DraftDecorator[] = [
    {
      strategy,
      component: config.Component
    }
  ]

  return {
    decorators
  }
}
