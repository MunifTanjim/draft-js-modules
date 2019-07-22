import { KeyBindingUtil } from 'draft-js'

type KeyBindingFn = import('../types').KaTeXHook['keyBindingFn']

const KEY_M = 77

export const keyBindingFn: KeyBindingFn = (
  store,
  event
): ReturnType<KeyBindingFn> => {
  const { key, keyCode } = event

  const editorState = store.getEditorState()
  const contentState = editorState.getCurrentContent()
  const selection = editorState.getSelection()

  if (keyCode === KEY_M && KeyBindingUtil.hasCommandModifier(event)) {
    return 'insert-texblock'
  }

  if (key === '$') {
    if (!selection.isCollapsed()) {
      return 'insert-inlinetex'
    }

    const blockKey = selection.getStartKey()
    const block = contentState.getBlockForKey(blockKey)
    const prevChar = block.getText()[selection.getStartOffset() - 1]

    if (prevChar === '\\') {
      return `replace-prev-char-${key}`
    }

    return 'insert-inlinetex'
  }

  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    const dir = key === 'ArrowLeft' ? 'l' : 'r'

    if (!selection.isCollapsed()) {
      return null
    }

    const blockKey = selection.getStartKey()
    const block = contentState.getBlockForKey(blockKey)
    const startOffset = selection.getStartOffset()

    const atEndofBlock = block.getLength() === startOffset && dir === 'r'
    if (atEndofBlock) {
      const blockAfter = contentState.getBlockAfter(blockKey)
      if (
        blockAfter &&
        blockAfter.getType() === 'atomic' &&
        blockAfter.getData().get('type') === 'TEXBLOCK'
      ) {
        return `update-texblock-${dir}-${blockAfter.getKey()}`
      }
    }

    const atStartOfBlock = startOffset === 0 && dir === 'l'
    if (atStartOfBlock) {
      const blockBefore = contentState.getBlockBefore(blockKey)
      if (
        blockBefore &&
        blockBefore.getType() === 'atomic' &&
        blockBefore.getData().get('type') === 'TEXBLOCK'
      ) {
        return `update-texblock-${dir}-${blockBefore.getKey()}`
      }
    }

    const entityKey = block.getEntityAt(startOffset - (dir === 'l' ? 1 : 0))
    if (
      entityKey &&
      contentState.getEntity(entityKey).getType() === 'INLINETEX'
    ) {
      return `update-inlinetex-${dir}-${entityKey}`
    }
  }

  return null
}
