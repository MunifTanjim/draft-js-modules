import { ContentState, Modifier, SelectionState } from 'draft-js'
import { getNewBlockSelection } from './getNewBlockSelection'
import { removeEntity } from './removeEntity'
import { removeTeXBlock } from './removeTeXBlock'

type ContentBlock = import('draft-js').ContentBlock

type CommonParams = {
  contentState: ContentState
  tex: string
  type: 'TEXBLOCK' | 'INLINETEX'
  after?: number
}

type SaveTexParams = CommonParams & {
  block?: ContentBlock
  blockKey?: string
  entityKey?: string
  startPos?: number
}

type SaveInlineTeXParams = Pick<
  SaveTexParams,
  keyof CommonParams | 'entityKey' | 'blockKey' | 'startPos'
>

type SaveTeXBlockParams = Pick<SaveTexParams, keyof CommonParams | 'block'>

function saveInlineTeX({
  after,
  contentState,
  tex,
  type,
  entityKey,
  blockKey,
  startPos
}: SaveInlineTeXParams): [ContentState, SelectionState, boolean] {
  const needRemove = tex.length === 0

  let newContentState: ContentState
  let newSelection: SelectionState

  if (needRemove) {
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

  return [newContentState, newSelection!, needRemove]
}

function saveTeXBlock({
  after,
  contentState,
  tex,
  block
}: SaveTeXBlockParams): [ContentState, SelectionState, boolean] {
  const needRemove = tex.length === 0
  const blockKey = block!.getKey()

  let newContentState: ContentState
  let newSelection: SelectionState

  if (needRemove) {
    newContentState = removeTeXBlock(contentState, block!, after)
    newSelection = newContentState.getSelectionAfter()
  } else {
    newContentState = Modifier.mergeBlockData(
      contentState,
      SelectionState.createEmpty(blockKey),
      { tex } as any
    )

    if (after !== undefined) {
      newSelection = getNewBlockSelection(
        contentState.getBlockBefore(blockKey),
        contentState.getBlockAfter(blockKey),
        after
      ) as SelectionState
    }
  }

  return [newContentState, newSelection!, needRemove]
}

export const saveTeX = ({
  block,
  entityKey,
  blockKey,
  startPos,
  ...common
}: SaveTexParams): [ContentState, SelectionState, boolean] => {
  return entityKey
    ? saveInlineTeX({ ...common, entityKey, blockKey, startPos })
    : saveTeXBlock({ ...common, block })
}
