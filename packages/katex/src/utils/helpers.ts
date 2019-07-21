type ContentState = import('draft-js').ContentState
type SelectionState = import('draft-js').SelectionState

export function isAtEndOfBlock(
  contentState: ContentState,
  selection: SelectionState
): boolean {
  const currentBlockKey = selection.getAnchorKey()
  const currentBlock = contentState.getBlockForKey(currentBlockKey)
  return currentBlock.getText().length === selection.getStartOffset()
}

export function isAtEndOfContent(
  contentState: ContentState,
  selection: SelectionState
): boolean {
  if (!isAtEndOfBlock(contentState, selection)) {
    return false
  }

  const currentBlockKey = selection.getAnchorKey()
  const lastBlockKey = contentState.getLastBlock().getKey()
  return currentBlockKey === lastBlockKey
}

export function isCurrentBlockEmpty(
  contentState: ContentState,
  selection: SelectionState
): boolean {
  const currentBlockKey = selection.getAnchorKey()
  const currentBlock = contentState.getBlockForKey(currentBlockKey)
  return currentBlock.getText().length === 0
}
