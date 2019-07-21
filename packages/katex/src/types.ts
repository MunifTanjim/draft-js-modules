import { Hook } from '@draft-js-hooks/editor'

export type TeXType = 'INLINETEX' | 'TEXBLOCK'

export type KaTeXHook = Required<
  Pick<
    Hook,
    | 'init'
    | 'decorators'
    | 'blockRendererFn'
    | 'keyBindingFn'
    | 'handleKeyCommand'
  >
>

export type KaTeXHookConfig = {} | undefined

export type EditingState = {
  dir?: 'l' | 'r'
  key: string
}

export type Internals = {
  getEditingState: () => EditingState
  setEditingState: (editingState: EditingState) => void
}
