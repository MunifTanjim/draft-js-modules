import React from 'react'
import DefaultStatsComponent from './components/DefaultStatsComponent'
import StatsViewer from './components/StatsViewer'

export * from './types'

type StatsModule = import('./types').StatsModule
type StatsModuleConfig = import('./types').StatsModuleConfig
type Store = import('@draft-js-modules/editor').Store

const defaultConfig: StatsModuleConfig = {
  Component: DefaultStatsComponent
}

export function getStatsModule(
  config: StatsModuleConfig = defaultConfig
): StatsModule {
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
