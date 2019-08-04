import React from 'react'
import DefaultStatsComponent from './components/DefaultStatsComponent'
import StatsViewer from './components/StatsViewer'

export * from './types'

type StatsHook = import('./types').StatsHook
type StatsHookConfig = import('./types').StatsHookConfig
type Store = import('@draft-js-modules/editor').Store

const defaultConfig: StatsHookConfig = {
  Component: DefaultStatsComponent
}

export function getStatsHook(
  config: StatsHookConfig = defaultConfig
): StatsHook {
  const store: Partial<Store> = {}

  function init(editorStore: Store): void {
    Object.assign(store, editorStore)
  }

  return {
    init,
    Stats: (): React.ReactElement => {
      return <StatsViewer config={config} store={store} />
    }
  }
}
