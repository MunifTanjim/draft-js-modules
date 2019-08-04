import { Module, Store } from '@draft-js-modules/editor'
import { ReactElement } from 'react'

export type Stats = {
  char: number
  word: number
  line: number
}

export type StatsModule = Pick<Required<Module>, 'init'> & {
  Stats: () => ReactElement
}
export type StatsModuleConfig = { Component: StatsComponent }

export type StatsComponent = (props: StatsComponentProps) => ReactElement
export type StatsComponentProps = { stats: Stats }

export type StatsViewerProps = {
  config: NonNullable<StatsModuleConfig>
  store: Partial<Store>
}
