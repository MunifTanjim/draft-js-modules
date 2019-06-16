import React from 'react'
import DefaultStatsComponent from './components/DefaultStatsComponent'
import StatsViewer from './components/StatsViewer'

type StatsHook = import('./types').StatsHook
type StatsHookConfig = import('./types').StatsHookConfig
type Store = import('@draft-js-hooks/editor').Store

const defaultConfig: NonNullable<StatsHookConfig> = {
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

export default StatsHook
