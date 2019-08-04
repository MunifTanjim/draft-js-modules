import { Module } from '@draft-js-modules/editor'
import { ReactElement } from 'react'

export type HashtagModule = Pick<Required<Module>, 'decorators'>
export type HashtagModuleConfig = {
  Component?: HashtagComponent
  props?: { [key: string]: any }
}

export type HashtagComponent = (props: HashtagComponentProps) => ReactElement
export type HashtagComponentProps = HashtagModuleConfig['props'] & {}
