import { SelectionState } from 'draft-js'

type ContentBlock = import('draft-js').ContentBlock

export function getNewBlockSelection(
  blockBefore: ContentBlock,
  blockAfter: ContentBlock,
  after: boolean
): SelectionState {
  let targetBlock
  let offset

  if (after) {
    targetBlock = blockAfter || blockBefore
    offset = blockAfter ? 0 : targetBlock.getLength()
  } else {
    targetBlock = blockBefore || blockAfter
    offset = blockBefore ? targetBlock.getLength() : 0
  }

  return SelectionState.createEmpty(targetBlock.getKey()).merge({
    anchorOffset: offset,
    focusOffset: offset,
    hasFocus: true
  }) as SelectionState
}
