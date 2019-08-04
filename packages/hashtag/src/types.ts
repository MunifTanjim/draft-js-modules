import { Hook } from '@draft-js-modules/editor'
import { ReactElement } from 'react'

export type HashtagHook = Pick<Required<Hook>, 'decorators'>
export type HashtagHookConfig = {
  Component?: HashtagComponent
  props?: { [key: string]: any }
}

export type HashtagComponent = (props: HashtagComponentProps) => ReactElement
export type HashtagComponentProps = HashtagHookConfig['props'] & {}
