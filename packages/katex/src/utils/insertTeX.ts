import {
  BlockMapBuilder,
  ContentBlock,
  EditorState,
  genKey,
  Modifier
} from 'draft-js'
import {
  isAtEndOfBlock,
  isAtEndOfContent,
  isCurrentBlockEmpty
} from './helpers'

type ContentState = import('draft-js').ContentState

export function insertInlineTeX(editorState: EditorState): EditorState {
  let contentState = editorState.getCurrentContent()
  let selection = editorState.getSelection()

  let tex = ''

  if (!selection.isCollapsed()) {
    const blockKey = selection.getStartKey()
    if (blockKey === selection.getEndKey()) {
      tex = contentState
        .getBlockForKey(blockKey)
        .getText()
        .slice(selection.getStartOffset(), selection.getEndOffset())
    }
    contentState = Modifier.removeRange(contentState, selection, 'backward')
    selection = contentState.getSelectionAfter()
  }

  contentState = contentState.createEntity('INLINETEX', 'IMMUTABLE', {
    tex,
    type: 'INLINETEX'
  })
  const entityKey = contentState.getLastCreatedEntityKey()

  const atBeginOfBlock = selection.getStartOffset() === 0
  const atEndOfBlock = isAtEndOfBlock(contentState, selection)

  if (atBeginOfBlock) {
    contentState = Modifier.insertText(contentState, selection, ' ')
    selection = contentState.getSelectionAfter()
  }

  contentState = Modifier.insertText(
    contentState,
    selection,
    ' ',
    undefined,
    entityKey
  )
  selection = contentState.getSelectionAfter()

  if (atEndOfBlock) {
    contentState = Modifier.insertText(contentState, selection, ' ')
  }

  return EditorState.push(editorState, contentState, 'apply-entity')
}

export function insertTeXBlock(editorState: EditorState): EditorState {
  const contentState = editorState.getCurrentContent()
  const selectionState = editorState.getSelection()

  const afterRemoval = Modifier.removeRange(
    contentState,
    selectionState,
    'backward'
  )

  const targetSelection = afterRemoval.getSelectionAfter()

  const currentBlockEmpty = isCurrentBlockEmpty(afterRemoval, targetSelection)
  const atEndOfBlock = isAtEndOfBlock(afterRemoval, targetSelection)
  const atEndOfContent = isAtEndOfContent(afterRemoval, targetSelection)

  const afterSplit =
    !currentBlockEmpty || atEndOfContent
      ? Modifier.splitBlock(afterRemoval, targetSelection)
      : afterRemoval
  const insertionTarget = afterSplit.getSelectionAfter()

  const asAtomicBlock = Modifier.setBlockType(
    afterSplit,
    insertionTarget,
    'atomic'
  )

  const fragmentArray = [
    new ContentBlock({
      key: genKey(),
      type: 'atomic',
      data: {
        tex: '',
        type: 'TEXBLOCK'
      }
    })
  ]

  if (!atEndOfBlock || atEndOfContent) {
    fragmentArray.push(
      new ContentBlock({
        key: genKey(),
        type: 'unstyled'
      })
    )
  }

  const fragment = BlockMapBuilder.createFromArray(fragmentArray)

  const withAtomicBlock = Modifier.replaceWithFragment(
    asAtomicBlock,
    insertionTarget,
    fragment
  )

  const newContentState = withAtomicBlock.merge({
    selectionBefore: selectionState,
    selectionAfter: withAtomicBlock.getSelectionAfter().set('hasFocus', false)
  }) as ContentState

  return EditorState.push(editorState, newContentState, 'insert-fragment')
}
