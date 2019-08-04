import * as Draft from 'draft-js'
import * as React from 'react'

export type DraftCustomRendererObject = {
  component?: React.Component | React.FC
  editable?: boolean
  props?: object
}

type Get<T> = () => T
type GetState<T> = Get<T>
type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export type Store = {
  getEditor: Get<Draft.Editor | null>
  getEditorState: GetState<Draft.EditorState>
  setEditorState: Draft.EditorProps['onChange']
  getReadOnly: GetState<boolean>
  setReadOnly: SetState<boolean>
}

export type GetStore = Get<Store>

export type InternalStore = {
  editor: React.RefObject<Draft.Editor>
  editorState: Draft.EditorState
  setEditorState: Store['setEditorState']
  readOnly: boolean
  setReadOnly: Store['setReadOnly']
  getStore: Get<Store>
}

type InjectStore<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => infer R
  ? (store: Store, ...args: P) => R
  : never

type FnPropNames =
  | 'blockRendererFn'
  | 'blockStyleFn'
  | 'customStyleFn'
  | 'keyBindingFn'

type HandlePropNames =
  | 'handleKeyCommand'
  | 'handleBeforeInput'
  | 'handleDrop'
  | 'handleDroppedFiles'
  | 'handlePastedFiles'
  | 'handlePastedText'
  | 'handleReturn'

type MapPropNames = 'blockRenderMap' | 'customStyleMap'

type ModifiedEditorProps = Pick<Draft.EditorProps, MapPropNames> &
  {
    [P in FnPropNames | HandlePropNames]?: InjectStore<
      NonNullable<Draft.EditorProps[P]>
    >
  } & {
    decorators?: Draft.DraftDecorator[]
  }

export type ModuleProps = ModifiedEditorProps & {
  onChange?: (editorState: Draft.EditorState) => Draft.EditorState
}

export interface Module extends ModuleProps {
  init?: (store: Store) => void
  [key: string]: any
}

export type EditorProps = Pick<
  Draft.EditorProps,
  Exclude<keyof Draft.EditorProps, keyof ModifiedEditorProps>
> &
  Pick<ModuleProps, keyof ModifiedEditorProps> & {
    modules?: Module[]
    store?: React.MutableRefObject<Store | undefined>
  }
