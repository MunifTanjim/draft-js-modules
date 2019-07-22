import { Hook, Store } from '@draft-js-hooks/editor'
import { ReactElement } from 'react'

export type Stats = {
  char: number
  word: number
  line: number
}

export type StatsHook = Pick<Required<Hook>, 'init'> & {
  Stats: () => ReactElement
}
export type StatsHookConfig = { Component: StatsComponent }

export type StatsComponent = (props: StatsComponentProps) => ReactElement
export type StatsComponentProps = { stats: Stats }

export type StatsViewerProps = {
  config: NonNullable<StatsHookConfig>
  store: Partial<Store>
}
