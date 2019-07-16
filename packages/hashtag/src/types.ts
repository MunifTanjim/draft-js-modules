import { Hook } from '@draft-js-hooks/editor'
import * as React from 'react'

export type HashtagHook = Required<Pick<Hook, 'decorators'>>
export type HashtagHookConfig = {
  Component?: HashtagComponent
  props?: { [key: string]: any }
}

export type HashtagComponent = (
  props: HashtagComponentProps
) => React.ReactElement
export type HashtagComponentProps = HashtagHookConfig['props'] & {}

export declare function getHashtagHook(config?: HashtagHookConfig): HashtagHook
