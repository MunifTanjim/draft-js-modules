import { SelectionState } from 'draft-js'

type ContentBlock = import('draft-js').ContentBlock

export function getNewBlockSelection(
  blockBefore: ContentBlock,
  blockAfter: ContentBlock,
  after: number
): SelectionState | void {
  if (!blockAfter && !blockBefore) {
    return
  }

  let nextBlock
  let offset

  if (after) {
    nextBlock = blockAfter || blockBefore
    offset = blockAfter ? 0 : nextBlock.getLength()
  } else {
    nextBlock = blockBefore || blockAfter
    offset = blockBefore ? nextBlock.getLength() : 0
  }

  return SelectionState.createEmpty(nextBlock.getKey()).merge({
    anchorOffset: offset,
    focusOffset: offset,
    hasFocus: true
  }) as SelectionState
}
