import { Hook } from '@draft-js-hooks/editor'

export type Direction = 'l' | 'r'

export type EditingState = {
  dir?: Direction
  key: string
}

export type Internals = {
  getEditingState: () => EditingState
  setEditingState: (newEditingState: EditingState) => void
}

export type KaTeXHook = Pick<
  Required<Hook>,
  | 'init'
  | 'decorators'
  | 'blockRendererFn'
  | 'handleKeyCommand'
  | 'keyBindingFn'
>

export type KaTeXHookConfig = {}

export type TeXType = 'INLINETEX' | 'TEXBLOCK'
