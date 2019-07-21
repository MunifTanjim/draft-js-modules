import { Modifier, SelectionState } from 'draft-js'

type ContentState = import('draft-js').ContentState

export function removeEntity(
  contentState: ContentState,
  blockKey: string,
  start: number,
  end: number
): ContentState {
  const selectionToRemove = SelectionState.createEmpty(blockKey).merge({
    anchorOffset: start,
    focusOffset: end
  }) as SelectionState

  return Modifier.removeRange(contentState, selectionToRemove, 'backward')
}
