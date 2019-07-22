import { ContentState } from 'draft-js'
import { getNewBlockSelection } from './getNewBlockSelection'

type ContentBlock = import('draft-js').ContentBlock

export function removeTeXBlock(
  contentState: ContentState,
  block: ContentBlock,
  after: boolean
): ContentState {
  const blockMap = contentState.getBlockMap()
  const blockKey = block.getKey()
  const blockAfter = contentState.getBlockAfter(blockKey)
  const blockBefore = contentState.getBlockBefore(blockKey)

  if (!blockAfter && !blockBefore) {
    if (
      block.getType() === 'atomic' &&
      block.getData().get('type') === 'TEXBLOCK'
    ) {
      return ContentState.createFromText('')
    }

    return contentState
  }

  const newBlockMap = blockMap.delete(blockKey)

  return contentState
    .set('blockMap', newBlockMap)
    .set(
      'selectionAfter',
      getNewBlockSelection(blockBefore, blockAfter, after)
    ) as ContentState
}
