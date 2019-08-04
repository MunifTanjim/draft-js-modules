import { Module } from '@draft-js-modules/editor'

export type Direction = 'l' | 'r'

export type EditingState = {
  dir?: Direction
  key: string
}

export type Internals = {
  getEditingState: () => EditingState
  setEditingState: (newEditingState: Partial<EditingState>) => void
}

export type KaTeXModule = Pick<
  Required<Module>,
  | 'init'
  | 'decorators'
  | 'blockRendererFn'
  | 'handleKeyCommand'
  | 'keyBindingFn'
>

export type KaTeXModuleConfig = {}

export type TeXType = 'INLINETEX' | 'TEXBLOCK'
