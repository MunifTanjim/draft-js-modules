import { Modifier, SelectionState } from 'draft-js'
import { getNewBlockSelection } from './getNewBlockSelection'
import { removeEntity } from './removeEntity'
import { removeTeXBlock } from './removeTeXBlock'

type ContentBlock = import('draft-js').ContentBlock
type ContentState = import('draft-js').ContentState
type TeXType = import('../types').TeXType

type CommonParams = {
  contentState: ContentState
  tex: string
  type: TeXType
  after?: boolean
}

type SaveInlineTeXParams = CommonParams & {
  blockKey: string
  entityKey: string
  startPos: number
}

type SaveTeXBlockParams = CommonParams & {
  block: ContentBlock
}

export function saveInlineTeX({
  after,
  contentState,
  tex,
  type,
  entityKey,
  blockKey,
  startPos
}: SaveInlineTeXParams): [ContentState, SelectionState, boolean] {
  const needsRemoval = tex.length === 0

  let newContentState: ContentState
  let newSelection: SelectionState

  if (needsRemoval) {
    newContentState = removeEntity(
      contentState,
      blockKey!,
      startPos!,
      startPos! + 1
    )
    newSelection = newContentState.getSelectionAfter()
  } else {
    newContentState = contentState.mergeEntityData(entityKey!, {
      tex,
      type
    })

    if (after !== undefined) {
      const offset = after ? startPos! + 1 : startPos
      newSelection = SelectionState.createEmpty(blockKey!).merge({
        anchorOffset: offset,
        focusOffset: offset,
        hasFocus: true
      }) as SelectionState
    }
  }

  return [newContentState, newSelection!, needsRemoval]
}

export function saveTeXBlock({
  after,
  contentState,
  tex,
  block
}: SaveTeXBlockParams): [ContentState, SelectionState, boolean] {
  const needsRemoval = tex.length === 0
  const blockKey = block!.getKey()

  let newContentState: ContentState
  let newSelection: SelectionState

  if (needsRemoval) {
    newContentState = removeTeXBlock(contentState, block!, after)
    newSelection = newContentState.getSelectionAfter()
  } else {
    newContentState = Modifier.mergeBlockData(
      contentState,
      SelectionState.createEmpty(blockKey),
      { tex } as any
    )

    if (after) {
      newSelection = getNewBlockSelection(
        contentState.getBlockBefore(blockKey),
        contentState.getBlockAfter(blockKey),
        after
      ) as SelectionState
    }
  }

  return [newContentState, newSelection!, needsRemoval]
}
