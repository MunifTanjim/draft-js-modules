type DraftDecorator = import('draft-js').DraftDecorator

export const inlineTeXStrategy: DraftDecorator['strategy'] = (
  contentBlock,
  callback,
  contentState
): void => {
  contentBlock.findEntityRanges((character): boolean => {
    const entityKey = character.getEntity()
    if (!entityKey) return false
    return contentState.getEntity(entityKey).getType() === 'INLINETEX'
  }, callback)
}
