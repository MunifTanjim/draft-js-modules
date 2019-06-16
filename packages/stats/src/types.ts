import { Hook, Store } from '@draft-js-hooks/editor'

export type Stats = {
  char: number
  word: number
  line: number
}

export type StatsHook = Hook & { Stats: () => React.ReactElement }
export type StatsHookConfig = { Component: StatsComponent } | undefined

export type StatsComponent = (props: StatsComponentProps) => React.ReactElement
export type StatsComponentProps = { stats: Stats }

export type StatsViewerProps = {
  config: NonNullable<StatsHookConfig>
  store: Partial<Store>
}

export declare const getStatsHook: (config: StatsHookConfig) => StatsHook

export default getStatsHook
