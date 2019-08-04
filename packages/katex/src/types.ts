import { Hook } from '@draft-js-modules/editor'

export type Direction = 'l' | 'r'

export type EditingState = {
  dir?: Direction
  key: string
}

export type Internals = {
  getEditingState: () => EditingState
  setEditingState: (newEditingState: Partial<EditingState>) => void
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
