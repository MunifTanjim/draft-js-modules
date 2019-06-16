import * as Draft from 'draft-js'
import * as Immutable from 'immutable'
import * as React from 'react'

export type StyleMap = {
  [styleName: string]: {
    [key: string]: string
  }
}

export type DraftCustomRendererObject = {
  component?: React.Component | React.FC
  editable?: boolean
  props?: object
}

// Draft.DraftDecorator
export type DraftDecorator = {
  strategy: (
    block: Draft.ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: Draft.ContentState
  ) => void
  component: React.FunctionComponent
  props?: Record<string, any>
}

// Draft.EditorProps['blockRenderMap']
export type BlockRenderMap = Immutable.Map<
  Draft.DraftBlockType | string,
  Draft.DraftBlockRenderConfig
>

// Draft.EditorProps['customStyleFn']
export type CustomStyleFn = (
  styleNames: Draft.DraftInlineStyle,
  block: Draft.ContentBlock
) => StyleMap

// Draft.EditorProps['handleBeforeInput']
export type HandleBeforeInput = (
  chars: string,
  editorState: Draft.EditorState,
  eventTimeStamp: number
) => Draft.DraftHandleValue

// Draft.EditorProps['handleKeyCommand']
export type HandleKeyCommand = (
  command: Draft.DraftEditorCommand | string,
  editorState: Draft.EditorState,
  eventTimeStamp: number
) => Draft.DraftHandleValue

type Get<T> = () => T
type GetState<T> = Get<T>
type SetState<T> = React.Dispatch<React.SetStateAction<T>>

type HandlerPropNames =
  | 'handleKeyCommand'
  | 'handleBeforeInput'
  | 'handleDrop'
  | 'handleDroppedFiles'
  | 'handlePastedFiles'
  | 'handlePastedText'
  | 'handleReturn'

type HookPropNames =
  | 'blockRendererFn'
  | 'blockRenderMap'
  | 'blockStyleFn'
  | 'customStyleMap'
  | 'customStyleFn'
  | HandlerPropNames
  | 'keyBindingFn'
  | 'onChange'

type OverriddenHookPropNames =
  | 'blockRenderMap'
  | 'customStyleFn'
  | 'handleBeforeInput'
  | 'handleKeyCommand'

export type Store = {
  getEditor: Get<Draft.Editor | null>
  getEditorState: GetState<Draft.EditorState>
  setEditorState: SetState<Draft.EditorState>
  getReadOnly: GetState<boolean>
  setReadOnly: SetState<boolean>
}

export type GetStore = Get<Store>

export type InternalStore = {
  editor: React.RefObject<Draft.Editor>
  editorState: Draft.EditorState
  setEditorState: SetState<Draft.EditorState>
  readOnly: boolean
  setReadOnly: SetState<boolean>
  getStore: Get<Store>
}

export type HookProps = Pick<
  Draft.EditorProps,
  Exclude<HookPropNames, OverriddenHookPropNames | 'onChange'>
> & {
  blockRenderMap?: BlockRenderMap
  customStyleFn?: CustomStyleFn
  handleKeyCommand?: HandleKeyCommand
  handleBeforeInput?: HandleBeforeInput
  onChange?: (editorState: Draft.EditorState) => Draft.EditorState
}

export interface Hook extends HookProps {
  init?: (store: Store) => void
  decorators?: DraftDecorator[]
  [key: string]: any
}

export type RegularEditorProps = Draft.EditorProps

export type EditorProps = {
  hooks?: Hook[]
  store?: React.MutableRefObject<Store | undefined>
} & RegularEditorProps

export declare const Editor: (props: EditorProps) => React.ReactElement

export default Editor
