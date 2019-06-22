import * as Draft from 'draft-js'
import * as Immutable from 'immutable'
import * as React from 'react'

export type DraftCustomRendererObject = {
  component?: React.Component | React.FC
  editable?: boolean
  props?: object
}

// `draft-js` & `@types/draft-js` has `immutable` version mismatch
// Draft.DraftBlockRenderMap
export type DraftBlockRenderMap = Immutable.Map<
  Draft.DraftBlockType,
  Draft.DraftBlockRenderConfig
>

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
  Exclude<HookPropNames, 'onChange'>
> & {
  onChange?: (editorState: Draft.EditorState) => Draft.EditorState
}

export interface Hook extends HookProps {
  init?: (store: Store) => void
  decorators?: Draft.DraftDecorator[]
  [key: string]: any
}

export type RegularEditorProps = Draft.EditorProps

export type EditorProps = {
  hooks?: Hook[]
  store?: React.MutableRefObject<Store | undefined>
} & RegularEditorProps

export declare const Editor: (props: EditorProps) => React.ReactElement

export default Editor
