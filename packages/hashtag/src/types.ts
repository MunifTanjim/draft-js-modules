import { Hook } from '@draft-js-hooks/editor'
import * as React from 'react'

export type HashtagHook = Required<Pick<Hook, 'decorators'>>
export type HashtagHookConfig = { Component: HashtagComponent }

export type HashtagComponent = (
  props: HashtagComponentProps
) => React.ReactElement
export type HashtagComponentProps = {
  decoratedText: string
  offsetKey: string
  [key: string]: any
}

export declare function getHashtagHook(config?: HashtagHookConfig): HashtagHook
